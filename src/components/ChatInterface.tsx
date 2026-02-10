import { useEffect, useRef } from "react";
import { ChatMode, modes } from "@/lib/modes";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import type { ChatMessage as ChatMsg } from "@/lib/chat-stream";

interface ChatInterfaceProps {
  mode: ChatMode;
  messages: ChatMsg[];
  isLoading: boolean;
  onSend: (message: string) => void;
}

const ChatInterface = ({ mode, messages, isLoading, onSend }: ChatInterfaceProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const modeInfo = modes[mode];
  const Icon = modeInfo.icon;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 md:px-6">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-muted ${modeInfo.color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-heading text-sm font-semibold text-foreground">{modeInfo.label}</h2>
          <p className="text-xs text-muted-foreground">{modeInfo.description}</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {isLoading && messages[messages.length - 1]?.role === "user" && <TypingIndicator />}
      </div>

      {/* Input */}
      <ChatInput
        onSend={onSend}
        isLoading={isLoading}
        placeholder={`Ask ${modeInfo.label} anything...`}
      />
    </div>
  );
};

export default ChatInterface;
