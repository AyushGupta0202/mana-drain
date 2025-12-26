"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useGameStore } from "@/store/game-store";
import { fadeInUp } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types";

interface TransactionFormProps {
  editingTransaction?: Transaction | null;
  editPosition?: { top: number; left: number } | null;
  onClose?: () => void;
}

export function TransactionForm({ editingTransaction = null, editPosition = null, onClose }: TransactionFormProps = {}) {
  const [isOpen, setIsOpen] = useState(!!editingTransaction);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("food");
  const addTransaction = useGameStore((state) => state.addTransaction);
  const editTransaction = useGameStore((state) => state.editTransaction);
  const categories = useGameStore((state) => state.categories);

  const isEditing = !!editingTransaction;

  useEffect(() => {
    if (editingTransaction) {
      setAmount(editingTransaction.amount.toString());
      setDescription(editingTransaction.description);
      setCategoryId(editingTransaction.category.id);
      setIsOpen(true);
    }
  }, [editingTransaction]);

  // Update position on scroll/resize when editing
  useEffect(() => {
    if (!isEditing || !editPosition) return;

    const updatePosition = () => {
      // Position will be maintained by the style prop
      // This effect ensures the modal stays visible on scroll
    };

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isEditing, editPosition]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (numAmount > 0 && description.trim()) {
      if (isEditing && editingTransaction) {
        editTransaction(editingTransaction.id, numAmount, categoryId, description.trim());
      } else {
        addTransaction(numAmount, categoryId, description.trim());
      }
      setAmount("");
      setDescription("");
      setCategoryId("food");
      setIsOpen(false);
      onClose?.();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setAmount("");
    setDescription("");
    setCategoryId("food");
    onClose?.();
  };

  // Don't render the FAB if we're in edit mode
  if (isEditing && !isOpen) {
    return null;
  }


  const modalContent = !isOpen && !isEditing ? (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsOpen(true)}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#A855F7] flex items-center justify-center shadow-lg z-50"
    >
      <Plus className="w-6 h-6 text-white" />
    </motion.button>
  ) : (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-[9998]"
        onClick={handleClose}
      />
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      className={cn(
        "fixed w-96 max-w-[calc(100vw-3rem)] glass-card border-2 border-[#00D9FF]/50 p-6 z-[9999] overflow-y-auto shadow-2xl",
        !isEditing && "bottom-6 right-6"
      )}
        style={
          isEditing && editPosition && typeof window !== 'undefined'
            ? {
                top: `${editPosition.top}px`,
                left: `${Math.min(editPosition.left, window.innerWidth - 400)}px`, // Ensure it doesn't go off-screen
                maxHeight: `${Math.min(window.innerHeight - editPosition.top - 24, 600)}px`, // Don't go below viewport, max 600px
              }
            : undefined
        }
        onClick={(e) => e.stopPropagation()}
      >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold font-heading text-white leading-tight">
                {isEditing ? "Edit Transaction" : "Add Transaction"}
              </h3>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-black/20 rounded transition-smooth flex-shrink-0"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" onClick={(e) => e.stopPropagation()}>
            <div>
              <label className="block text-sm text-gray-400 mb-2 leading-normal">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.currentTarget.focus();
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.currentTarget.focus();
                  }}
                  onFocus={(e) => {
                    e.stopPropagation();
                    setTimeout(() => e.target.select(), 0);
                  }}
                  placeholder="0.00"
                  className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition-smooth cursor-text select-text"
                  style={{ pointerEvents: 'auto' }}
                  required
                  autoFocus
                />
              </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2 leading-normal">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.currentTarget.focus();
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.currentTarget.focus();
                  }}
                  onFocus={(e) => {
                    e.stopPropagation();
                    setTimeout(() => e.target.select(), 0);
                  }}
                  placeholder="What did you buy?"
                  className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition-smooth cursor-text select-text"
                  style={{ pointerEvents: 'auto' }}
                  required
                />
              </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2 leading-normal">Category</label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryId(cat.id)}
                    className={cn(
                      "p-3 rounded-lg border-2 transition-smooth text-sm font-medium",
                      categoryId === cat.id
                        ? `border-[${cat.color}] bg-[${cat.color}]/20`
                        : "border-gray-700 bg-black/20 text-gray-400 hover:border-gray-600"
                    )}
                    style={
                      categoryId === cat.id
                        ? {
                            borderColor: cat.color,
                            backgroundColor: `${cat.color}20`,
                            color: cat.color,
                          }
                        : {}
                    }
                  >
                    <div className="text-lg mb-1 leading-none">{cat.icon}</div>
                    <div className="text-xs leading-normal">{cat.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#00D9FF] to-[#A855F7] rounded-lg font-bold text-white hover:opacity-90 transition-smooth mt-2"
              onClick={(e) => e.stopPropagation()}
            >
              {isEditing ? "Update Transaction" : "Add Transaction"}
            </button>
          </form>
        </motion.div>
      </>
  );

  // Render modal/form in a portal to avoid stacking context issues when open
  if (typeof window !== 'undefined' && (isOpen || isEditing)) {
    return createPortal(modalContent, document.body);
  }

  // Render FAB button normally (not in portal)
  if (typeof window !== 'undefined') {
    return modalContent;
  }

  return null;
}
