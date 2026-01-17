import { Inbox } from "lucide-react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
}

export function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col items-center justify-center py-20 px-8 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
        <Inbox className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-message-title text-foreground mb-2">{title}</h3>
      {subtitle && (
        <p className="text-message-preview text-muted-foreground max-w-xs">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
