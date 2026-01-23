"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const announcements = [
  "FREE SHIPPING ON ORDERS ABOVE Rs. 999",
  "NEW ARRIVALS JUST DROPPED",
  "USE CODE 'HADDU10' FOR 10% OFF",
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="promo-banner text-white py-2.5 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-[11px] md:text-xs tracking-[0.2em] text-center"
          >
            {announcements[currentIndex]}
          </motion.p>
        </AnimatePresence>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition"
          aria-label="Close announcement"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
