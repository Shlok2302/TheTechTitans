import { ShieldCheck, Building2 } from "lucide-react";
import { motion } from "framer-motion";

interface MessageCardProps {
  bankName: string;
  preview: string;
  timestamp: string;
  isVerified?: boolean;
  index: number;
}

export function MessageCard({
  bankName,
  preview,
  timestamp,
  isVerified = true,
  index,
}: MessageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.4 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="card-banking cursor-pointer transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          {/* Bank Name and Verified Badge Row */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-message-title text-foreground">{bankName}</span>
                {isVerified && (
                  <span className="verified-badge">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Message Preview */}
          <p className="text-message-preview text-foreground/80 line-clamp-2 pl-[52px]">
            {preview}
          </p>
        </div>
      </div>

      {/* Timestamp */}
      <div className="mt-3 flex justify-end">
        <span className="text-timestamp">{timestamp}</span>
      </div>
    </motion.div>
  );
}
