import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Gift } from "lucide-react";
import { TopAppBar } from "@/components/TopAppBar";
import { TrustBanner } from "@/components/TrustBanner";
import { PromotionCard } from "@/components/PromotionCard";
import { BottomNavigation } from "@/components/BottomNavigation";
import { EmptyState } from "@/components/EmptyState";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Sample verified bank promotions
const bankPromotions = [
  {
    id: 1,
    bankName: "Bank of India",
    offerTitle: "Lifetime Free Platinum Credit Card",
    description: "Get up to ₹5,00,000 credit limit with zero annual fees and exclusive rewards on every transaction.",
    highlights: [
      { label: "No Annual Fee" },
      { label: "5% Cashback" },
      { label: "Airport Lounge" },
    ],
    isVerified: true,
  },
  {
    id: 2,
    bankName: "HDFC Bank",
    offerTitle: "Pre-Approved Personal Loan @ 10.5% p.a.",
    description: "Instant approval up to ₹25 lakhs with minimal documentation. Flexible EMI options from 12 to 60 months.",
    highlights: [
      { label: "Instant Approval" },
      { label: "Low Interest" },
      { label: "No Collateral" },
    ],
    isVerified: true,
  },
  {
    id: 3,
    bankName: "State Bank of India",
    offerTitle: "Home Loan Festival Offer",
    description: "Special festive discount of 0.25% on home loan interest rates. Processing fee waived for loans above ₹50 lakhs.",
    highlights: [
      { label: "0.25% Discount" },
      { label: "No Processing Fee" },
    ],
    isVerified: true,
  },
  {
    id: 4,
    bankName: "ICICI Bank",
    offerTitle: "Amazon Pay ICICI Credit Card",
    description: "Earn 5% unlimited cashback on Amazon purchases. 2% cashback on payments via Amazon Pay. No joining fee.",
    highlights: [
      { label: "5% Amazon Cashback" },
      { label: "No Joining Fee" },
      { label: "Fuel Surcharge Waiver" },
    ],
    isVerified: true,
  },
  {
    id: 5,
    bankName: "Axis Bank",
    offerTitle: "Fixed Deposit @ 7.5% p.a.",
    description: "Senior citizens get additional 0.50% interest. Lock in high rates for up to 5 years with flexible tenure options.",
    highlights: [
      { label: "7.5% Interest" },
      { label: "Senior Citizen Bonus" },
    ],
    isVerified: true,
  },
];

export default function Promotions() {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [promotions] = useState(bankPromotions);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const handleTabChange = (tab: "messages" | "promotions") => {
    if (tab === "messages") {
      navigate("/");
    }
  };

  const handleViewDetails = (offerTitle: string) => {
    toast.info("Opening secure bank portal...", {
      description: `Viewing: ${offerTitle}`,
      icon: <Gift className="h-4 w-4" />,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopAppBar title="Bank Promotions" isSecure={true} />
      
      <TrustBanner message="All promotions are verified and sent by your bank" />

      {/* Pull to refresh indicator */}
      <div className="flex justify-center py-3">
        <motion.button
          onClick={handleRefresh}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors"
        >
          <RefreshCw 
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} 
          />
          <span className="text-xs">
            {isRefreshing ? "Refreshing..." : "Pull to refresh"}
          </span>
        </motion.button>
      </div>

      {/* Promotions List */}
      <div className="space-y-4 px-4">
        {promotions.length > 0 ? (
          promotions.map((promo, index) => (
            <PromotionCard
              key={promo.id}
              bankName={promo.bankName}
              offerTitle={promo.offerTitle}
              description={promo.description}
              highlights={promo.highlights}
              isVerified={promo.isVerified}
              index={index}
              onViewDetails={() => handleViewDetails(promo.offerTitle)}
            />
          ))
        ) : (
          <EmptyState
            title="No promotions available right now"
            subtitle="Check back later for verified bank offers"
          />
        )}
      </div>

      <BottomNavigation activeTab="promotions" onTabChange={handleTabChange} />
    </div>
  );
}
