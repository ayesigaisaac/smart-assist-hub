import ReactMarkdown from "react-markdown";
import { Bot, User, Copy, Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import BudgetChart from "./BudgetChart";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  onRegenerate?: () => void;
  isLast?: boolean;
}

const ChatMessage = ({ role, content, timestamp, onRegenerate, isLast }: ChatMessageProps) => {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("group flex gap-3 px-4 py-3", isUser && "flex-row-reverse")}>
      <div className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
      )}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className="flex flex-col gap-1 max-w-[90%] md:max-w-[80%]">
        <div className={cn(
          "rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-card border border-border text-card-foreground rounded-tl-sm shadow-sm"
        )}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{content}</p>
          ) : (
            <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-code:text-primary prose-code:font-mono prose-code:text-xs">
              <ReactMarkdown
                components={{
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const isInline = !match;
                    if (isInline) {
                      return <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono" {...props}>{children}</code>;
                    }
                    return (
                      <div className="relative">
                        <span className="absolute right-2 top-2 text-[10px] uppercase tracking-wider text-muted-foreground">{match[1]}</span>
                        <code className={className} {...props}>{children}</code>
                      </div>
                    );
                  },
                }}
              >{content}</ReactMarkdown>
              <BudgetChart content={content} />
            </div>
          )}
        </div>
        <div className={cn(
          "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
          isUser ? "flex-row-reverse" : "flex-row"
        )}>
          {timestamp && (
            <span className="text-[10px] text-muted-foreground px-1">
              {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          {!isUser && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
                    {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3 text-muted-foreground" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom"><p className="text-xs">{copied ? "Copied!" : "Copy"}</p></TooltipContent>
              </Tooltip>
              {isLast && onRegenerate && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onRegenerate}>
                      <RefreshCw className="h-3 w-3 text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom"><p className="text-xs">Regenerate</p></TooltipContent>
                </Tooltip>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
