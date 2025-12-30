export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: Date;
}

export const DEFAULT_INCOME_CATEGORIES = [
  'Maaş',
  'Freelance',
  'Yatırım',
  'Hediye',
  'Diğer Gelir',
];

export const DEFAULT_EXPENSE_CATEGORIES = [
  'Yemek',
  'Ulaşım',
  'Alışveriş',
  'Faturalar',
  'Sağlık',
  'Eğlence',
  'Kira',
  'Diğer Gider',
];
