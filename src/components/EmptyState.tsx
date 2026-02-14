import { ChatMode, modes } from "@/lib/modes";
import { motion } from "framer-motion";

interface EmptyStateProps {
  mode: ChatMode;
}

const EmptyState = ({ mode }: EmptyStateProps) => {
  const modeInfo = modes[mode];
  const Icon = modeInfo.icon;

  return (
    <div className="flex flex-col items-center gap-5 px-6 py-8">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
      >
        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 ${modeInfo.color}`}>
          <Icon className="h-8 w-8" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-center max-w-md"
      >
        <h3 className="font-heading text-2xl font-bold text-foreground">Martha</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{modeInfo.description}</p>
        <p className="mt-3 text-xs text-muted-foreground/70 leading-relaxed">{modeInfo.greeting}</p>
      </motion.div>
    </div>
  );
};

export default EmptyState;
