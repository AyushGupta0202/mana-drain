"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Trash2, Edit2 } from "lucide-react";
import { useGameStore } from "@/store/game-store";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { fadeInUp } from "@/lib/motion-variants";
import { TransactionForm } from "./transaction-form";
import type { Transaction } from "@/types";

export function TransactionList() {
  // Subscribe to transactions array - Zustand will re-render when it changes
  const transactions = useGameStore((state) => state.transactions);
  const deleteTransaction = useGameStore((state) => state.deleteTransaction);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [editPosition, setEditPosition] = useState<{ top: number; left: number } | null>(null);
  const transactionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Ensure we have a valid array and it's the latest reference
  const transactionList = transactions ?? [];

  if (transactionList.length === 0) {
    return (
      <div className="p-6 text-center border border-gray-800 rounded-lg bg-[rgba(15,15,20,0.6)] backdrop-blur-sm">
        <p className="text-gray-400">No transactions yet. Add your first one!</p>
      </div>
    );
  }

  return (
    <>
    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
      {transactionList.map((txn) => (
        <motion.div
          key={txn.id}
          ref={(el) => {
            transactionRefs.current[txn.id] = el;
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-[rgba(15,15,20,0.6)] backdrop-blur-sm p-4 border border-gray-800 hover:border-gray-700 transition-smooth flex items-center justify-between group rounded-lg"
        >
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
              style={{
                backgroundColor: `${txn.category.color}20`,
                border: `1px solid ${txn.category.color}40`,
              }}
            >
              {txn.category.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate leading-normal">{txn.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="text-xs px-2 py-0.5 rounded leading-normal"
                  style={{
                    color: txn.category.color,
                    backgroundColor: `${txn.category.color}20`,
                  }}
                >
                  {txn.category.name}
                </span>
                <span className="text-xs text-gray-500 leading-normal">
                  {format(txn.date, "MMM d, h:mm a")}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-lg font-bold text-white leading-normal whitespace-nowrap">
              {formatCurrency(txn.amount)}
            </span>
            <button
              onClick={() => {
                const element = transactionRefs.current[txn.id];
                if (element) {
                  const rect = element.getBoundingClientRect();
                  // Position popup on the transaction row
                  setEditPosition({
                    top: rect.top + rect.height + 8, // Below the transaction row with 8px gap
                    left: rect.left, // Aligned to left of transaction row
                  });
                }
                setEditingTransaction(txn);
              }}
              className="p-2 hover:bg-[#00D9FF]/20 rounded-lg transition-smooth opacity-0 group-hover:opacity-100 flex-shrink-0"
              title="Edit transaction"
            >
              <Edit2 className="w-4 h-4 text-[#00D9FF]" />
            </button>
            <button
              onClick={() => deleteTransaction(txn.id)}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-smooth opacity-0 group-hover:opacity-100 flex-shrink-0"
              title="Delete transaction"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
    {editingTransaction && (
      <TransactionForm
        editingTransaction={editingTransaction}
        editPosition={editPosition}
        onClose={() => {
          setEditingTransaction(null);
          setEditPosition(null);
        }}
      />
    )}
    </>
  );
}
