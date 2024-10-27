import React from "react";
import NotificationIcon from "@/assets/notification.svg"; // Import your notification SVG

interface NotificationProps {
  count: number; // The number of notifications
}

export default function Notification({ count }: NotificationProps) {
  return (
    <div className="relative cursor-pointer">
      {/* Notification Icon */}
      <img src={NotificationIcon} alt="Notifications" className="w-6 h-6" />

      {/* Notification Badge */}
      {count > 0 && (
        <span
          className="absolute top-[-3px] right-2 inline-flex items-center justify-center 
                     w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full"
        >
          {count}
        </span>
      )}
    </div>
  );
}
