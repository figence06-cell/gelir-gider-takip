import { useState, useCallback, useMemo } from 'react';
import { Transaction, TransactionType } from '@/types/transaction';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const totals = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [transactions]);

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    totals,
  };
};
