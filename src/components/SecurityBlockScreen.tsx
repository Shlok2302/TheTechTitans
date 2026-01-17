import { AlertTriangle, ShieldX } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface SecurityBlockScreenProps {
  reason: "developer_mode" | "vpn";
}

export function SecurityBlockScreen({ reason }: SecurityBlockScreenProps) {
  const messages = {
    developer_mode: {
      title: "Security Risk Detected",
      description: "Please disable Developer Mode to continue using SafeTransact Messages.",
    },
    vpn: {
      title: "VPN Connection Detected",
      description: "Please disable your VPN connection to access secure banking messages.",
    },
  };

  const message = messages[reason];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary p-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/20"
      >
        <ShieldX className="h-12 w-12 text-destructive" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <div className="mb-2 flex items-center justify-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <h1 className="text-xl font-medium text-primary-foreground">{message.title}</h1>
        </div>
        <p className="mb-8 max-w-sm text-primary-foreground/70">{message.description}</p>
        
        <Button
          disabled
          variant="secondary"
          className="opacity-50 cursor-not-allowed"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );
}
