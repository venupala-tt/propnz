"use client";

import { useState, useEffect, useRef } from "react";
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
  const tickerRef = useRef<HTMLDivElement>(null);

  const speedMap: Record<Speed, string> = {
    slow: "40s",
    medium: "20s",
    fast: "10s",
  };

  useEffect(() => {
    if (tickerRef.current) {
      tickerRef.current.style.animationPlayState = isPlaying ? "running" : "paused";
    }
  }, [isPlaying]);

  const handleMouseEnter = () => {
    if (tickerRef.current) {
      tickerRef.current.style.animationPlayState = "paused";
    }
  };

  const handleMouseLeave = () => {
    if (tickerRef.current && isPlaying) {
      tickerRef.current.style.animationPlayState = "running";
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="w-full bg-gray-100 border border-gray-300 py-2 px-4 rounded-lg shadow-sm text-gray-600 text-sm">
        No notifications available.
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100 border border-gray-300 py-2 flex items-center overflow-hidden rounded-lg shadow-sm">
      <span className="ml-3 font-bold text-gray-700">Notifications:</span>
      <div
        ref={tickerRef}
        className="ml-4 flex whitespace-nowrap animate-scroll"
        style={{
          animation: `scroll ${speedMap[speed]} linear infinite`,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {items.map((item, i) => (
          <div key={i} className="mx-6 flex items-center space-x-2">
            {item.date && (
              <span className="text-gray-500 text-sm">[{item.date}]</span>
            )}
            <Link
              href={item.url}
              target="_blank"
              className="text-blue-600 hover:underline flex space-x-1"
            >
              <span className="font-bold">{item.title}</span>
              console.log("Notifications fetched:", entries.items.map(i = > i.fields));
            </Link>
          </div>
        ))}
      </div>
      <div className="ml-auto flex items-center mr-3 space-x-2">
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
