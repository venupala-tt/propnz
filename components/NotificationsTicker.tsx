"use client";

import Link from "next/link";

type Notification = {
  date: string;
  title: string;
  subject: string;
  url: string;
};

export default function NotificationsTicker({
  items,
  speed = "medium",
}: {
  items: Notification[];
  speed?: "slow" | "medium" | "fast";
}) {
  if (!items || items.length === 0) {
    return (
      <div className="text-gray-500 text-sm">No notifications available.</div>
    );
  }

  const speedMap: Record<"slow" | "medium" | "fast", string> = {
    slow: "30s",
    medium: "20s",
    fast: "10s",
  };

  return (
    <div className="relative h-full overflow-hidden">
      <div
        className="flex flex-col animate-vertical-scroll"
        style={{
          animationDuration: speedMap[speed],
        }}
      >
        {/* Duplicate list to allow seamless looping */}
        {[...items, ...items].map((item, i) => (
          <div key={i} className="py-2">
            {item.date && (
              <span className="text-gray-500 text-sm mr-2">[{item.date}]</span>
            )}
            <Link
              href={item.url}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              <span className="font-bold">{item.title}</span>
              <span> - {item.subject}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
