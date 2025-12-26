"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useGameStore } from "@/store/game-store";

export function StreakDisplay() {
  const streakDays = useGameStore((state) => state.streakDays);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-6 border border-[#FF6B35] flex items-center gap-3"
    >
      <div className="p-2 rounded-lg bg-[#FF6B35]/20 flex-shrink-0">
        <Flame className="w-6 h-6 text-[#FF6B35]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-400 leading-normal">Current Streak</p>
        <p className="text-2xl font-bold font-heading text-white leading-tight">
          {streakDays} {streakDays === 1 ? "Day" : "Days"}
        </p>
      </div>
    </motion.div>
  );
}
