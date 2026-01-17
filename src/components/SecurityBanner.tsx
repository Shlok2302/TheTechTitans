import { Lock } from "lucide-react";
import { motion } from "framer-motion";

export function SecurityBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="security-banner mx-4 mt-4"
    >
      <Lock className="h-4 w-4 flex-shrink-0" />
      <span className="text-sm">Messages are end-to-end encrypted and verified</span>
    </motion.div>
  );
}
