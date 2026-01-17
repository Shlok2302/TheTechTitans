import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { TopAppBar } from "@/components/TopAppBar";
import { SecurityBanner } from "@/components/SecurityBanner";
import { MessageCard } from "@/components/MessageCard";
import { BottomNavigation } from "@/components/BottomNavigation";

// Sample verified bank messages
const bankMessages = [
  {
    id: 1,
    bankName: "Bank of India",
    preview: "₹25,000 debited from your account ending 4321. Ref: UPI/345678901234. Balance: ₹1,45,678.50",
    timestamp: "Today, 10:42 AM",
    isVerified: true,
  },
  {
    id: 2,
    bankName: "State Bank of India",
    preview: "₹15,500 credited to your account ending 8765 from NEFT. Updated balance: ₹2,34,500.00",
    timestamp: "Today, 9:15 AM",
    isVerified: true,
  },
  {
    id: 3,
    bankName: "HDFC Bank",
    preview: "Your credit card payment of ₹8,450 is due on 25th Jan. Pay now to avoid late fees.",
    timestamp: "Yesterday, 6:30 PM",
    isVerified: true,
  },
  {
    id: 4,
    bankName: "ICICI Bank",
    preview: "OTP 847293 for INR 3,299.00 transaction at Amazon. Valid for 10 minutes. Do not share.",
    timestamp: "Yesterday, 2:45 PM",
    isVerified: true,
  },
  {
    id: 5,
    bankName: "Axis Bank",
    preview: "Your fixed deposit of ₹1,00,000 has matured. Interest earned: ₹7,250. Visit branch for renewal.",
    timestamp: "Jan 15, 11:00 AM",
    isVerified: true,
  },
];

const promotions = [
  {
    id: 1,
    bankName: "HDFC Bank",
    preview: "Get 10% cashback on all online purchases this weekend! Use code WEEKEND10. T&C apply.",
    timestamp: "Today, 8:00 AM",
    isVerified: true,
  },
  {
    id: 2,
    bankName: "ICICI Bank",
    preview: "Pre-approved personal loan up to ₹10 lakhs at just 10.5% p.a. Apply now!",
    timestamp: "Yesterday, 10:00 AM",
    isVerified: true,
  },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<"messages" | "promotions">("messages");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const currentMessages = activeTab === "messages" ? bankMessages : promotions;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopAppBar title="SafeTransact Messages" isSecure={true} />
      
      <SecurityBanner />

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

      {/* Message List */}
      <div className="space-y-3 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === "messages" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === "messages" ? 20 : -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {currentMessages.map((message, index) => (
              <MessageCard
                key={message.id}
                bankName={message.bankName}
                preview={message.preview}
                timestamp={message.timestamp}
                isVerified={message.isVerified}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {currentMessages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <p className="text-muted-foreground">No messages yet</p>
          </motion.div>
        )}
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
