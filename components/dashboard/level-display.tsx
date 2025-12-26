"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/game-store";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Sparkles } from "lucide-react";

export function LevelDisplay() {
  const { level, xp, xpToNextLevel } = useGameStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 border-2 border-[#00D9FF] glow-common"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#A855F7] flex items-center justify-center border-2 border-[#00D9FF]">
              <span className="text-2xl font-bold font-heading leading-none">{level}</span>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-5 h-5 text-[#FFD700]" />
            </motion.div>
          </div>
          <div>
            <p className="text-sm text-gray-400 leading-normal">Level</p>
            <p className="text-xl font-bold font-heading text-white leading-tight">{level}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400 leading-normal">XP</p>
          <p className="text-lg font-bold font-heading text-[#00D9FF] leading-tight">
            {xp.toLocaleString()} / {xpToNextLevel.toLocaleString()}
          </p>
        </div>
      </div>
      <ProgressBar
        value={xp}
        max={xpToNextLevel}
        glowColor="common"
        showValue={false}
      />
    </motion.div>
  );
}
