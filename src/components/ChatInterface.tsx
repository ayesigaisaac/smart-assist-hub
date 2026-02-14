import { useEffect, useRef } from "react";
import { ChatMode, modes } from "@/lib/modes";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import SuggestedPrompts from "./SuggestedPrompts";
import EmptyState from "./EmptyState";
import type { ChatMessage as ChatMsg } from "@/lib/chat-stream";

interface ChatInterfaceProps {
  mode: ChatMode;
  messages: ChatMsg[];
  timestamps: Date[];
  isLoading: boolean;
  onSend: (message: string) => void;
  onRegenerate: () => void;
}

const ChatInterface = ({ mode, messages, timestamps, isLoading, onSend, onRegenerate }: ChatInterfaceProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const modeInfo = modes[mode];

  const hasOnlyGreeting = messages.length === 1 && messages[0].role === "assistant";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {hasOnlyGreeting ? (
          <div className="flex min-h-full flex-col">
            <div className="flex-1 flex flex-col items-center justify-center">
              <EmptyState mode={mode} />
            </div>
            <div className="pb-2">
              <SuggestedPrompts mode={mode} onSelect={onSend} />
            </div>
          </div>
        ) : (
          <div className="pb-4">
            {messages.map((msg, i) => (
              <ChatMessage
                key={i}
                role={msg.role}
                content={msg.content}
                timestamp={timestamps[i]}
                isLast={i === messages.length - 1 && msg.role === "assistant"}
                onRegenerate={onRegenerate}
              />
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && <TypingIndicator />}
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput
        onSend={onSend}
        isLoading={isLoading}
        placeholder={`Message Martha...`}
      />
    </div>
  );
};

export default ChatInterface;
