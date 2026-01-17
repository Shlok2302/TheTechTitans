import { ShieldCheck, Building2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Highlight {
  label: string;
}

interface PromotionCardProps {
  bankName: string;
  offerTitle: string;
  description: string;
  highlights?: Highlight[];
  isVerified?: boolean;
  index: number;
  onViewDetails?: () => void;
}

export function PromotionCard({
  bankName,
  offerTitle,
  description,
  highlights = [],
  isVerified = true,
  index,
  onViewDetails,
}: PromotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.4 }}
      className="bg-card rounded-xl shadow-md border border-border/50 p-4 space-y-4"
    >
      {/* Bank Name Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <span className="text-message-title text-primary font-medium">{bankName}</span>
        </div>
        {isVerified && (
          <span className="verified-badge">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Verified</span>
          </span>
        )}
      </div>

      {/* Offer Title */}
      <h3 className="text-message-title text-foreground font-medium leading-snug">
        {offerTitle}
      </h3>

      {/* Offer Description */}
      <p className="text-message-preview text-muted-foreground line-clamp-3">
        {description}
      </p>

      {/* Highlight Chips */}
      {highlights.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {highlights.map((highlight, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary"
            >
              {highlight.label}
            </span>
          ))}
        </div>
      )}

      {/* CTA Button */}
      <div className="flex justify-end pt-2">
        <Button
          onClick={onViewDetails}
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg px-4 py-2 text-sm font-medium"
        >
          View Details
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </motion.div>
  );
}
