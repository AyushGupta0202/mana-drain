"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  glowColor?: "common" | "rare" | "epic" | "legendary";
  showValue?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max,
  label,
  glowColor = "common",
  showValue = true,
  className,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const glowColors = {
    common: "bg-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.5)]",
    rare: "bg-[#A855F7] shadow-[0_0_20px_rgba(168,85,247,0.5)]",
    epic: "bg-[#FF6B35] shadow-[0_0_20px_rgba(255,107,53,0.5)]",
    legendary: "bg-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.5)]",
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400 leading-normal">{label}</span>
          {showValue && (
            <span className="text-white font-medium leading-normal">
              {value.toLocaleString()} / {max.toLocaleString()}
            </span>
          )}
        </div>
      )}
      <div className="relative h-3 bg-black/30 rounded-full overflow-hidden border border-gray-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            "h-full rounded-full",
            glowColors[glowColor]
          )}
        />
      </div>
      {showValue && !label && (
        <div className="text-xs text-gray-500 text-right mt-1 leading-normal">
          {percentage.toFixed(1)}%
        </div>
      )}
    </div>
  );
}
