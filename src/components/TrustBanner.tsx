import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface TrustBannerProps {
  message: string;
}

export function TrustBanner({ message }: TrustBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="security-banner mx-4 mt-4"
    >
      <ShieldCheck className="h-4 w-4 flex-shrink-0" />
      <span className="text-sm">{message}</span>
    </motion.div>
  );
}
