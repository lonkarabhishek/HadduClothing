"use client";

import { motion } from "framer-motion";

type Props = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function LoadingSpinner({ size = "md", className = "" }: Props) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 border-gray-200 border-t-[#0C4008] rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <LoadingSpinner size="lg" />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-sm text-gray-500"
      >
        Loading...
      </motion.p>
    </div>
  );
}
