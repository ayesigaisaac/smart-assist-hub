import { ChatMode, modes } from "@/lib/modes";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface SuggestedPromptsProps {
  mode: ChatMode;
  onSelect: (prompt: string) => void;
}

const SuggestedPrompts = ({ mode, onSelect }: SuggestedPromptsProps) => {
  const suggestions = modes[mode].suggestions;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {suggestions.map((s, i) => (
          <motion.button
            key={s}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => onSelect(s)}
            className="group flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-left text-sm text-foreground/80 hover:bg-muted/60 hover:border-primary/30 transition-all duration-200"
          >
            <span className="line-clamp-2 pr-2">{s}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;
