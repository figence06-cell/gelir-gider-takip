import { useState, useCallback } from 'react';
import { DEFAULT_INCOME_CATEGORIES, DEFAULT_EXPENSE_CATEGORIES, TransactionType } from '@/types/transaction';

export const useCategories = () => {
  const [incomeCategories, setIncomeCategories] = useState<string[]>(DEFAULT_INCOME_CATEGORIES);
  const [expenseCategories, setExpenseCategories] = useState<string[]>(DEFAULT_EXPENSE_CATEGORIES);

  const addCategory = useCallback((type: TransactionType, category: string) => {
    if (type === 'income') {
      setIncomeCategories(prev => {
        if (prev.includes(category)) return prev;
        return [...prev, category];
      });
    } else {
      setExpenseCategories(prev => {
        if (prev.includes(category)) return prev;
        return [...prev, category];
      });
    }
  }, []);

  const deleteCategory = useCallback((type: TransactionType, category: string) => {
    if (type === 'income') {
      setIncomeCategories(prev => prev.filter(c => c !== category));
    } else {
      setExpenseCategories(prev => prev.filter(c => c !== category));
    }
  }, []);

  const getCategories = useCallback((type: TransactionType) => {
    return type === 'income' ? incomeCategories : expenseCategories;
  }, [incomeCategories, expenseCategories]);

  return {
    incomeCategories,
    expenseCategories,
    addCategory,
    deleteCategory,
    getCategories,
  };
};
