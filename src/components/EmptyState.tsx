import { ChatMode, modes } from "@/lib/modes";
import { motion } from "framer-motion";

interface EmptyStateProps {
  mode: ChatMode;
}

const EmptyState = ({ mode }: EmptyStateProps) => {
  const modeInfo = modes[mode];
  const Icon = modeInfo.icon;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" style={{ animationDuration: "3s" }} />
        <div className={`flex h-20 w-20 items-center justify-center rounded-full bg-muted ${modeInfo.color}`}>
          <Icon className="h-10 w-10" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h3 className="font-heading text-lg font-semibold text-foreground">{modeInfo.label}</h3>
        <p className="mt-1 text-sm text-muted-foreground max-w-xs">{modeInfo.description}</p>
      </motion.div>
    </div>
  );
};

export default EmptyState;
