"use client";

import { motion } from "framer-motion";
import { Wallet, TrendingDown, Target, Zap } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { AchievementBadge } from "@/components/ui/achievement-badge";
import { LevelDisplay } from "@/components/dashboard/level-display";
import { StreakDisplay } from "@/components/dashboard/streak-display";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { TransactionList } from "@/components/transactions/transaction-list";
import { SpendingChart } from "@/components/charts/spending-chart";
import { useGameStore } from "@/store/game-store";
import { fadeInUp, staggerContainer } from "@/lib/motion-variants";
import { formatCurrency } from "@/lib/utils";

export default function Home() {
  const { 
    budgetRemaining, 
    monthlyBudget, 
    totalSpent, 
    level, 
    xp, 
    achievements,
    streakDays,
  } = useGameStore();
  const budgetPercentage = (budgetRemaining / monthlyBudget) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 pb-24">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A855F7]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-2 bg-gradient-to-r from-[#00D9FF] via-[#A855F7] to-[#FFD700] bg-clip-text text-transparent leading-tight">
            MANA DRAIN
          </h1>
          <p className="text-gray-400 text-base leading-normal">RPG Finance Tracker</p>
        </motion.div>

        {/* Level Display & Streak */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <LevelDisplay />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <StreakDisplay />
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <motion.div variants={fadeInUp}>
            <StatCard
              title="Budget Remaining"
              value={formatCurrency(budgetRemaining)}
              icon={Wallet}
              glowColor={budgetRemaining > monthlyBudget * 0.3 ? "common" : "epic"}
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <StatCard
              title="Total Spent"
              value={formatCurrency(totalSpent)}
              icon={TrendingDown}
              glowColor="rare"
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <StatCard
              title="Monthly Budget"
              value={formatCurrency(monthlyBudget)}
              icon={Target}
              glowColor="legendary"
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <StatCard
              title="Current Level"
              value={`Lv. ${level}`}
              icon={Zap}
              glowColor="epic"
            />
          </motion.div>
        </motion.div>

        {/* Budget Health Bar */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="glass-card p-6 mb-8 border-2 border-[#00D9FF]/50 glow-common"
        >
          <h2 className="text-2xl font-bold font-heading mb-4 text-white leading-tight">
            Budget Health
          </h2>
          <ProgressBar
            value={budgetRemaining}
            max={monthlyBudget}
            label="Remaining Budget"
            glowColor={budgetPercentage > 30 ? "common" : budgetPercentage > 10 ? "epic" : "legendary"}
          />
        </motion.div>

        {/* Spending Chart */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <SpendingChart />
        </motion.div>

        {/* Transactions Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="glass-card p-6 mb-8 border border-gray-800 overflow-hidden"
        >
          <h2 className="text-2xl font-bold font-heading mb-4 text-white leading-tight">
            Recent Transactions
          </h2>
          <TransactionList key="transaction-list" />
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="glass-card p-6 border border-gray-800"
        >
          <h2 className="text-2xl font-bold font-heading mb-4 text-white leading-tight">
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AchievementBadge
              title="First Transaction"
              description="Log your first expense"
              icon="zap"
              rarity="common"
              unlocked={achievements.includes("first-transaction")}
            />
            <AchievementBadge
              title="Budget Master"
              description="Stay under budget for 7 days"
              icon="trophy"
              rarity="rare"
              unlocked={achievements.includes("budget-master")}
            />
            <AchievementBadge
              title="Level Up!"
              description="Reach level 5"
              icon="star"
              rarity="epic"
              unlocked={achievements.includes("level-5")}
            />
            <AchievementBadge
              title="XP Collector"
              description="Earn 1000 XP"
              icon="award"
              rarity="legendary"
              unlocked={achievements.includes("xp-collector")}
            />
            <AchievementBadge
              title="7 Day Streak"
              description="Log transactions for 7 consecutive days"
              icon="zap"
              rarity="epic"
              unlocked={achievements.includes("streak-7")}
            />
          </div>
        </motion.div>
      </div>

      {/* Floating Transaction Form */}
      <TransactionForm />
    </main>
  );
}
