import { ChatMode, modes } from "@/lib/modes";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface SuggestedPromptsProps {
  mode: ChatMode;
  onSelect: (prompt: string) => void;
}

const SuggestedPrompts = ({ mode, onSelect }: SuggestedPromptsProps) => {
  const suggestions = modes[mode].suggestions;

  return (
    <div className="flex flex-wrap gap-2 px-4 py-2">
      {suggestions.map((s, i) => (
        <motion.button
          key={s}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          onClick={() => onSelect(s)}
          className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm"
        >
          <Sparkles className="h-3 w-3" />
          {s}
        </motion.button>
      ))}
    </div>
  );
};

export default SuggestedPrompts;
