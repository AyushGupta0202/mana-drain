"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Zap, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { scaleIn } from "@/lib/motion-variants";

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon?: "trophy" | "star" | "zap" | "award";
  rarity?: "common" | "rare" | "epic" | "legendary";
  unlocked?: boolean;
  className?: string;
}

const iconMap = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  award: Award,
};

export function AchievementBadge({
  title,
  description,
  icon = "trophy",
  rarity = "common",
  unlocked = false,
  className,
}: AchievementBadgeProps) {
  const Icon = iconMap[icon];

  const rarityStyles = {
    common: "border-[#00D9FF] text-[#00D9FF]",
    rare: "border-[#A855F7] text-[#A855F7]",
    epic: "border-[#FF6B35] text-[#FF6B35]",
    legendary: "border-[#FFD700] text-[#FFD700]",
  };

  return (
    <motion.div
      variants={scaleIn}
      initial="initial"
      animate="animate"
      className={cn(
        "glass-card p-4 border transition-smooth",
        rarityStyles[rarity],
        !unlocked && "opacity-50 grayscale",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("p-2 rounded-lg bg-black/20 flex-shrink-0", rarityStyles[rarity])}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm mb-1 leading-normal">{title}</h4>
          <p className="text-xs text-gray-400 leading-normal">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
