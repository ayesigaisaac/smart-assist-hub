import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ChatMode } from "@/lib/modes";
import { useChat } from "@/hooks/useChat";
import DashboardSidebar from "@/components/DashboardSidebar";
import ChatInterface from "@/components/ChatInterface";

interface Conversation {
  id: string;
  title: string;
  mode: ChatMode;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<ChatMode>("budget");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const { messages, isLoading, sendMessage, resetMessages, loadMessages } = useChat(mode, currentConversationId);

  // Auth check
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) navigate("/auth");
      else setUserId(session.user.id);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth");
      else setUserId(session.user.id);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  // Load conversations
  const loadConversations = useCallback(async () => {
    if (!userId) return;
    const { data } = await supabase
      .from("conversations")
      .select("id, title, mode")
      .order("updated_at", { ascending: false });
    if (data) setConversations(data as Conversation[]);
  }, [userId]);

  useEffect(() => { loadConversations(); }, [loadConversations]);

  const handleNewConversation = async () => {
    if (!userId) return;
    const { data } = await supabase
      .from("conversations")
      .insert({ user_id: userId, mode, title: `New ${mode} chat` })
      .select()
      .single();
    if (data) {
      setCurrentConversationId(data.id);
      resetMessages(mode);
      loadConversations();
    }
  };

  const handleSelectConversation = async (id: string) => {
    const conv = conversations.find(c => c.id === id);
    if (conv) {
      setMode(conv.mode as ChatMode);
      setCurrentConversationId(id);
      await loadMessages(id);
    }
  };

  const handleModeChange = (newMode: ChatMode) => {
    setMode(newMode);
    setCurrentConversationId(null);
    resetMessages(newMode);
  };

  const handleSend = async (input: string) => {
    // Auto-create conversation on first message
    if (!currentConversationId && userId) {
      const title = input.slice(0, 50) + (input.length > 50 ? "..." : "");
      const { data } = await supabase
        .from("conversations")
        .insert({ user_id: userId, mode, title })
        .select()
        .single();
      if (data) {
        setCurrentConversationId(data.id);
        loadConversations();
      }
    }
    sendMessage(input);
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <DashboardSidebar
        currentMode={mode}
        onModeChange={handleModeChange}
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
      />
      <main className="flex-1 overflow-hidden">
        <ChatInterface
          mode={mode}
          messages={messages}
          isLoading={isLoading}
          onSend={handleSend}
        />
      </main>
    </div>
  );
};

export default Dashboard;
