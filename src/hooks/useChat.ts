import { useState, useCallback } from "react";
import { ChatMessage, streamChat } from "@/lib/chat-stream";
import { ChatMode, modes } from "@/lib/modes";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export function useChat(mode: ChatMode, conversationId: string | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: modes[mode].greeting },
  ]);
  const [timestamps, setTimestamps] = useState<Date[]>([new Date()]);
  const [isLoading, setIsLoading] = useState(false);

  const resetMessages = useCallback((newMode: ChatMode) => {
    setMessages([{ role: "assistant", content: modes[newMode].greeting }]);
    setTimestamps([new Date()]);
  }, []);

  const loadMessages = useCallback(async (convId: string) => {
    const { data } = await supabase
      .from("messages")
      .select("role, content, created_at")
      .eq("conversation_id", convId)
      .order("created_at", { ascending: true });

    if (data && data.length > 0) {
      setMessages(data.map(m => ({ role: m.role as "user" | "assistant", content: m.content })));
      setTimestamps(data.map(m => new Date(m.created_at)));
    }
  }, []);

  const sendMessage = useCallback(async (input: string) => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setTimestamps(prev => [...prev, new Date()]);
    setIsLoading(true);

    if (conversationId) {
      await supabase.from("messages").insert({
        conversation_id: conversationId,
        role: "user",
        content: input.trim(),
      });
    }

    let assistantSoFar = "";
    let assistantTimestamp: Date | null = null;
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      if (!assistantTimestamp) {
        assistantTimestamp = new Date();
        setTimestamps(prev => [...prev, assistantTimestamp!]);
      }
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > updatedMessages.length - 1) {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: updatedMessages.filter(m => m.content !== modes[mode].greeting),
        mode,
        onDelta: upsertAssistant,
        onDone: async () => {
          setIsLoading(false);
          if (conversationId && assistantSoFar) {
            await supabase.from("messages").insert({
              conversation_id: conversationId,
              role: "assistant",
              content: assistantSoFar,
            });
          }
        },
        onError: (error) => {
          setIsLoading(false);
          toast({ title: "Error", description: error, variant: "destructive" });
        },
      });
    } catch {
      setIsLoading(false);
      toast({ title: "Error", description: "Failed to send message", variant: "destructive" });
    }
  }, [messages, isLoading, mode, conversationId]);

  const regenerate = useCallback(() => {
    if (isLoading) return;
    const lastUserIdx = messages.map(m => m.role).lastIndexOf("user");
    if (lastUserIdx === -1) return;

    const userMsg = messages[lastUserIdx].content;
    // Remove the last assistant message
    const trimmed = messages.slice(0, lastUserIdx + 1);
    const trimmedTs = timestamps.slice(0, lastUserIdx + 1);
    setMessages(trimmed);
    setTimestamps(trimmedTs);

    // Re-send
    setIsLoading(true);
    let assistantSoFar = "";
    let assistantTimestamp: Date | null = null;
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      if (!assistantTimestamp) {
        assistantTimestamp = new Date();
        setTimestamps(prev => [...prev, assistantTimestamp!]);
      }
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    streamChat({
      messages: trimmed.filter(m => m.content !== modes[mode].greeting),
      mode,
      onDelta: upsertAssistant,
      onDone: async () => {
        setIsLoading(false);
        if (conversationId && assistantSoFar) {
          await supabase.from("messages").insert({
            conversation_id: conversationId,
            role: "assistant",
            content: assistantSoFar,
          });
        }
      },
      onError: (error) => {
        setIsLoading(false);
        toast({ title: "Error", description: error, variant: "destructive" });
      },
    }).catch(() => {
      setIsLoading(false);
    });
  }, [messages, timestamps, isLoading, mode, conversationId]);

  return { messages, timestamps, isLoading, sendMessage, resetMessages, loadMessages, setMessages, regenerate };
}
