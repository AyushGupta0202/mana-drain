import { create } from "zustand";
import type { Transaction, SpendingCategory, Rarity } from "@/types";

interface GameState {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalSpent: number;
  budgetRemaining: number;
  monthlyBudget: number;
  achievements: string[];
  transactions: Transaction[];
  categories: SpendingCategory[];
  transactionCount: number;
  streakDays: number;
  lastTransactionDate: Date | null;
  
  // Actions
  addXP: (amount: number) => void;
  addTransaction: (amount: number, categoryId: string, description: string) => void;
  editTransaction: (id: string, amount: number, categoryId: string, description: string) => void;
  setMonthlyBudget: (amount: number) => void;
  unlockAchievement: (id: string) => void;
  deleteTransaction: (id: string) => void;
  checkAchievements: () => void;
  resetAllData: () => void;
}

const defaultCategories: SpendingCategory[] = [
  { id: "food", name: "Food", rarity: "common", icon: "🍔", color: "#00D9FF" },
  { id: "entertainment", name: "Entertainment", rarity: "rare", icon: "🎮", color: "#A855F7" },
  { id: "shopping", name: "Shopping", rarity: "epic", icon: "🛍️", color: "#FF6B35" },
  { id: "bills", name: "Bills", rarity: "legendary", icon: "💳", color: "#FFD700" },
  { id: "transport", name: "Transport", rarity: "common", icon: "🚗", color: "#00D9FF" },
  { id: "health", name: "Health", rarity: "rare", icon: "💊", color: "#A855F7" },
];

export const useGameStore = create<GameState>((set, get) => ({
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  totalSpent: 0,
  budgetRemaining: 50000,
  monthlyBudget: 50000,
  achievements: [],
  transactions: [],
  categories: defaultCategories,
  transactionCount: 0,
  streakDays: 0,
  lastTransactionDate: null,

  addXP: (amount) => {
    const { xp, xpToNextLevel, level } = get();
    const newXP = xp + amount;
    
    if (newXP >= xpToNextLevel) {
      const newLevel = level + 1;
      const remainingXP = newXP - xpToNextLevel;
      const newXPToNext = newLevel * 100;
      
      set({
        level: newLevel,
        xp: remainingXP,
        xpToNextLevel: newXPToNext,
      });
      
      // Check for level-based achievements
      get().checkAchievements();
    } else {
      set({ xp: newXP });
    }
  },

  addTransaction: (amount, categoryId, description) => {
    const { totalSpent, budgetRemaining, addXP, transactions, categories, transactionCount, lastTransactionDate } = get();
    const category = categories.find(c => c.id === categoryId) || categories[0];
    const now = new Date();
    
    const newTransaction: Transaction = {
      id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      amount,
      category,
      description,
      date: now,
    };
    
    const newTotal = totalSpent + amount;
    const newRemaining = budgetRemaining - amount;
    const newCount = transactionCount + 1;
    
    // Calculate streak
    let newStreak = 0;
    if (lastTransactionDate) {
      const daysDiff = Math.floor((now.getTime() - lastTransactionDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff === 0) {
        newStreak = get().streakDays;
      } else if (daysDiff === 1) {
        newStreak = get().streakDays + 1;
      } else {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }
    
    // Award XP
    addXP(10);
    
    // Bonus XP for staying under budget
    if (newRemaining > 0) {
      addXP(5);
    }
    
    // Bonus XP for streaks
    if (newStreak >= 7) {
      addXP(20);
    }
    
    // Create new array reference to ensure React detects the change
    const newTransactions = [newTransaction, ...transactions];
    
    set({
      totalSpent: newTotal,
      budgetRemaining: Math.max(0, newRemaining),
      transactions: newTransactions,
      transactionCount: newCount,
      streakDays: newStreak,
      lastTransactionDate: now,
    });
    
    // Check achievements
    get().checkAchievements();
  },

  setMonthlyBudget: (amount) => {
    const { totalSpent } = get();
    set({
      monthlyBudget: amount,
      budgetRemaining: Math.max(0, amount - totalSpent),
    });
  },

  unlockAchievement: (id) => {
    const { achievements } = get();
    if (!achievements.includes(id)) {
      set({ achievements: [...achievements, id] });
    }
  },

  editTransaction: (id, amount, categoryId, description) => {
    const { transactions, totalSpent, monthlyBudget, categories } = get();
    const transactionIndex = transactions.findIndex(t => t.id === id);
    if (transactionIndex === -1) return;
    
    const oldTransaction = transactions[transactionIndex];
    const category = categories.find(c => c.id === categoryId) || categories[0];
    
    // Calculate the difference in amount
    const amountDiff = amount - oldTransaction.amount;
    const newTotal = Math.max(0, totalSpent + amountDiff);
    const newRemaining = Math.max(0, Math.min(monthlyBudget, monthlyBudget - newTotal));
    
    // Update the transaction
    const updatedTransaction: Transaction = {
      ...oldTransaction,
      amount,
      category,
      description,
    };
    
    const newTransactions = [...transactions];
    newTransactions[transactionIndex] = updatedTransaction;
    
    set({
      transactions: newTransactions,
      totalSpent: newTotal,
      budgetRemaining: newRemaining,
    });
  },

  deleteTransaction: (id) => {
    const { transactions, totalSpent, monthlyBudget } = get();
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;
    
    const newTransactions = transactions.filter(t => t.id !== id);
    const refundedAmount = transaction.amount;
    const newTotal = Math.max(0, totalSpent - refundedAmount);
    
    set({
      transactions: newTransactions,
      totalSpent: newTotal,
      budgetRemaining: Math.min(monthlyBudget, monthlyBudget - newTotal),
      transactionCount: newTransactions.length,
    });
  },

  checkAchievements: () => {
    const { transactionCount, level, xp, streakDays, achievements, budgetRemaining, monthlyBudget } = get();
    
    // First Transaction
    if (transactionCount >= 1 && !achievements.includes("first-transaction")) {
      get().unlockAchievement("first-transaction");
    }
    
    // Level 5
    if (level >= 5 && !achievements.includes("level-5")) {
      get().unlockAchievement("level-5");
    }
    
    // 1000 XP
    if (xp >= 1000 && !achievements.includes("xp-collector")) {
      get().unlockAchievement("xp-collector");
    }
    
    // 7 Day Streak
    if (streakDays >= 7 && !achievements.includes("streak-7")) {
      get().unlockAchievement("streak-7");
    }
    
    // Under Budget
    const budgetPercentage = (budgetRemaining / monthlyBudget) * 100;
    if (budgetPercentage > 50 && transactionCount >= 5 && !achievements.includes("budget-master")) {
      get().unlockAchievement("budget-master");
    }
  },

  resetAllData: () => {
    set({
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      totalSpent: 0,
      budgetRemaining: 50000,
      monthlyBudget: 50000,
      achievements: [],
      transactions: [],
      categories: defaultCategories,
      transactionCount: 0,
      streakDays: 0,
      lastTransactionDate: null,
    });
  },
}));
