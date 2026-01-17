import { Shield, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface TopAppBarProps {
  title: string;
  isSecure?: boolean;
}

export function TopAppBar({ title, isSecure = true }: TopAppBarProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-primary shadow-lg"
    >
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-primary-foreground" />
          <h1 className="text-title text-primary-foreground">{title}</h1>
        </div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex items-center gap-2"
        >
          {isSecure ? (
            <div className="flex items-center gap-1.5 rounded-full bg-success/20 px-3 py-1">
              <ShieldCheck className="h-4 w-4 text-success" />
              <span className="text-xs font-medium text-success">Secure</span>
            </div>
          ) : (
            <div className="h-3 w-3 rounded-full bg-destructive animate-pulse-subtle" />
          )}
        </motion.div>
      </div>
    </motion.header>
  );
}
