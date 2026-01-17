import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

export default function Index() {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const handleTabChange = (tab: "messages" | "promotions") => {
    if (tab === "promotions") {
      navigate("/promotions");
    }
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
        {bankMessages.map((message, index) => (
          <MessageCard
            key={message.id}
            bankName={message.bankName}
            preview={message.preview}
            timestamp={message.timestamp}
            isVerified={message.isVerified}
            index={index}
          />
        ))}
      </div>

      <BottomNavigation activeTab="messages" onTabChange={handleTabChange} />
    </div>
  );
}
