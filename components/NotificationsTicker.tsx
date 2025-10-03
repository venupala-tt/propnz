"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { Pause, Play } from "lucide-react"; // ✅ icons

type Notification = {
  date: string;
  title: string;
  url: string;
};

export default function NotificationsTicker({
  items,
  speed = "medium",
}: {
  items: Notification[];
  speed?: "slow" | "medium" | "fast";
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  if (!items || items.length === 0) {
    return (
      <div className="text-gray-500 text-sm p-4 bg-white/80 rounded-lg border border-gray-200">
        No notifications available.
      </div>
    );
  }

  const speedMap: Record<"slow" | "medium" | "fast", string> = {
    slow: "30s",
    medium: "20s",
    fast: "15s",
  };

  // ✅ Toggle pause/resume
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.animationPlayState = isPaused ? "paused" : "running";
    }
  }, [isPaused]);

  // ✅ Also pause on hover for desktop users
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative h-full overflow-hidden p-3 rounded-xl 
                    bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm">
      {/* Play / Pause Button */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute top-2 right-2 p-1 rounded-md bg-gray-100 hover:bg-gray-200 shadow"
        aria-label={isPaused ? "Play ticker" : "Pause ticker"}
      >
        {isPaused ? <Play size={16} className="text-gray-700" /> : <Pause size={16} className="text-gray-700" />}
      </button>

      {/* Notifications list */}
      <div
        ref={containerRef}
        className="flex flex-col animate-vertical-scroll"
        style={{
          animationDuration: speedMap[speed],
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="py-2 border-b border-gray-100 last:border-none">
            {item.date && (
              <span className="text-gray-500 text-xs mr-2">[{item.date}]</span>
            )}
            <Link
              href={item.url}
              target="_blank"
              className="text-blue-600 hover:text-purple-600 font-medium transition-colors"
            >
              {item.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
