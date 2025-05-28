"use client";

import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useEffect, useState } from "react";

const OfflineToast = () => {
  const isOnline = useOnlineStatus();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOnline) {
      setMessage("You're offline");
      setShowToast(true);
    } else if (showToast) {
      setMessage("Connection restored");
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [isOnline, showToast]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
        showToast
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      } ${!isOnline ? "bg-error text-white" : "bg-success text-white"}`}
    >
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${!isOnline ? "bg-white animate-pulse" : "bg-white"}`}
        ></div>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};

export default OfflineToast;
