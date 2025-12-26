export type Rarity = "common" | "rare" | "epic" | "legendary";

export type SpendingCategory = {
  id: string;
  name: string;
  rarity: Rarity;
  icon: string;
  color: string;
};

export type Transaction = {
  id: string;
  amount: number;
  category: SpendingCategory;
  description: string;
  date: Date;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: "trophy" | "star" | "zap" | "award";
  rarity: Rarity;
  unlocked: boolean;
  unlockedAt?: Date;
};

