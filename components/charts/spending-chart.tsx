"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useGameStore } from "@/store/game-store";
import { formatCurrency } from "@/lib/utils";

const COLORS = {
  common: "#00D9FF",
  rare: "#A855F7",
  epic: "#FF6B35",
  legendary: "#FFD700",
};

export function SpendingChart() {
  const transactions = useGameStore((state) => state.transactions);

  const chartData = useMemo(() => {
    const categoryTotals = transactions.reduce((acc, txn) => {
      const catId = txn.category.id;
      acc[catId] = (acc[catId] || 0) + txn.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([id, value]) => {
      const category = transactions.find(t => t.category.id === id)?.category;
      return {
        name: category?.name || id,
        value: Number(value.toFixed(2)),
        color: category?.color || COLORS.common,
        rarity: category?.rarity || "common",
      };
    });
  }, [transactions]);

  if (chartData.length === 0) {
    return (
      <div className="glass-card p-6 text-center border border-gray-800">
        <p className="text-gray-400">No spending data yet</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 border border-gray-800">
      <h3 className="text-2xl font-bold font-heading mb-4 text-white leading-tight">Spending by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(props: any) => {
              const { name, percent } = props;
              return `${name || ''} ${percent ? (percent * 100).toFixed(0) : 0}%`;
            }}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number | undefined) => formatCurrency(value || 0)}
            contentStyle={{
              backgroundColor: "rgba(15, 15, 20, 0.98)",
              border: "1px solid rgba(0, 217, 255, 0.5)",
              borderRadius: "8px",
              color: "#ffffff",
              padding: "8px 12px",
            }}
            labelStyle={{
              color: "#ffffff",
              fontWeight: 600,
              marginBottom: "4px",
            }}
            itemStyle={{
              color: "#ffffff",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
