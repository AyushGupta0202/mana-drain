"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { cardHover } from "@/lib/motion-variants";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  glowColor?: "common" | "rare" | "epic" | "legendary";
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  glowColor = "common",
  trend,
  className,
}: StatCardProps) {
  const borderClasses = {
    common: "border-[#00D9FF]/40",
    rare: "border-[#A855F7]/40",
    epic: "border-[#FF6B35]/40",
    legendary: "border-[#FFD700]/40",
  };

  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className={cn(
        "glass-card p-6 transition-smooth border",
        borderClasses[glowColor],
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-black/20">
          <Icon className="w-5 h-5 text-[#00D9FF]" />
        </div>
        {trend && (
          <div
            className={cn(
              "text-sm font-medium",
              trend.isPositive ? "text-green-400" : "text-red-400"
            )}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}%
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-400 font-medium leading-normal">{title}</p>
        <p className="text-2xl font-bold font-heading text-white leading-tight">{value}</p>
      </div>
    </motion.div>
  );
}
