"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Notification = {
  date: string;
  title: string;
  subject: string;
  url: string;
};

type Speed = "slow" | "medium" | "fast";

export default function NotificationsTicker({
  items,
  speed = "medium",
}: {
  items: Notification[];
  speed?: Speed;
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const speedMap: Record<Speed, number> = {
    slow: 6000, // 6s per item
    medium: 4000, // 4s per item
    fast: 2000, // 2s per item
  };

  useEffect(() => {
    if (!isPlaying || items.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, speedMap[speed]);

    return () => clearInterval(interval);
  }, [isPlaying, items.length, speed]);

  if (!items || items.length === 0) {
    return (
      <div className="w-full bg-gray-100 border border-gray-300 py-2 px-4 rounded-lg shadow-sm text-gray-600 text-sm">
        No notifications available.
      </div>
    );
  }

  const currentItem = items[currentIndex];

  return (
    <div className="w-full bg-gray-100 border border-gray-300 py-3 px-4 flex items-center rounded-lg shadow-sm">
      <span className="font-bold text-gray-700 mr-3">Notifications:</span>

      <div className="flex-1 overflow-hidden h-6 relative">
        <div
          key={currentIndex}
          className="absolute w-full animate-slideUp"
        >
          {currentItem.date && (
            <span className="text-gray-500 text-sm mr-2">
              [{currentItem.date}]
            </span>
          )}
          <Link
            href={currentItem.url}
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            <span className="font-bold">{currentItem.title}</span>
            <span> - {currentItem.subject}</span>
          </Link>
        </div>
      </div>

      <div className="ml-auto flex items-center space-x-2">
        <button
          onClick={() => setIsPlaying(false)}
          className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:opacity-90"
        >
          ⏸ Pause
        </button>
        <button
          onClick={() => setIsPlaying(true)}
          className="px-2 py-1 bg-green-500 text-white text-sm rounded hover:opacity-90"
        >
          ▶ Play
        </button>
      </div>
    </div>
  );
}
