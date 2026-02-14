import ReactMarkdown from "react-markdown";
import { Bot, User, Copy, Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import BudgetChart from "./BudgetChart";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "group relative px-4 py-5 md:px-0",
        isUser ? "bg-transparent" : "bg-muted/40"
      )}
    >
      <div className="mx-auto flex max-w-3xl gap-4">
        <div className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full mt-0.5",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-gradient-to-br from-primary/80 to-accent/80 text-primary-foreground shadow-sm"
        )}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>

        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-foreground">
              {isUser ? "You" : "Martha"}
            </span>
            {timestamp && (
              <span className="text-[10px] text-muted-foreground">
                {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
          </div>

          <div className="text-sm leading-relaxed text-foreground/90">
            {isUser ? (
              <p className="whitespace-pre-wrap">{content}</p>
            ) : (
              <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-headings:text-foreground prose-headings:font-heading prose-pre:bg-secondary prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-code:text-primary prose-code:font-mono prose-code:text-xs prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                <ReactMarkdown
                  components={{
                    code({ className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      const isInline = !match;
                      if (isInline) {
                        return <code className="rounded-md bg-secondary px-1.5 py-0.5 text-xs font-mono" {...props}>{children}</code>;
                      }
                      return (
                        <div className="relative">
                          <span className="absolute right-3 top-2 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{match[1]}</span>
                          <code className={className} {...props}>{children}</code>
                        </div>
                      );
                    },
                    table({ children, ...props }) {
                      return (
                        <div className="overflow-x-auto my-3 rounded-lg border border-border">
                          <table className="w-full text-xs" {...props}>{children}</table>
                        </div>
                      );
                    },
                    th({ children, ...props }) {
                      return <th className="bg-muted px-3 py-2 text-left font-semibold text-foreground border-b border-border" {...props}>{children}</th>;
                    },
                    td({ children, ...props }) {
                      return <td className="px-3 py-2 border-b border-border/50" {...props}>{children}</td>;
                    },
                  }}
                >{content}</ReactMarkdown>
                <BudgetChart content={content} />
              </div>
            )}
          </div>

          {/* Actions */}
          {!isUser && (
            <div className="flex items-center gap-0.5 pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={handleCopy}>
                    {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom"><p className="text-xs">{copied ? "Copied!" : "Copy"}</p></TooltipContent>
              </Tooltip>
              {isLast && onRegenerate && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={onRegenerate}>
                      <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom"><p className="text-xs">Regenerate</p></TooltipContent>
                </Tooltip>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
