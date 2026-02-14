import { Bot } from "lucide-react";
import { motion } from "framer-motion";

const TypingIndicator = () => (
  <div className="px-4 py-5 md:px-0 bg-muted/40">
    <div className="mx-auto flex max-w-3xl gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-accent/80 text-primary-foreground shadow-sm mt-0.5">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1.5 pt-2">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="h-2 w-2 rounded-full bg-muted-foreground/40"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1, 0.85] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  </div>
);

export default TypingIndicator;
