export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: Date;
}

export const INCOME_CATEGORIES = [
  'Maaş',
  'Freelance',
  'Yatırım',
  'Hediye',
  'Diğer Gelir',
] as const;

export const EXPENSE_CATEGORIES = [
  'Yemek',
  'Ulaşım',
  'Alışveriş',
  'Faturalar',
  'Sağlık',
  'Eğlence',
  'Kira',
  'Diğer Gider',
] as const;
