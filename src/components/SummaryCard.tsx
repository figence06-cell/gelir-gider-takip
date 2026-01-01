import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  amount: number;
  type: 'income' | 'expense' | 'balance';
  delay?: number;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const SummaryCard = ({ title, amount, type, delay = 0 }: SummaryCardProps) => {
  const Icon = type === 'income' ? TrendingUp : type === 'expense' ? TrendingDown : Wallet;
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1",
        type === 'income' && "bg-income-bg border border-income/20",
        type === 'expense' && "bg-expense-bg border border-expense/20",
        type === 'balance' && "bg-card border border-border",
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center sm:items-start justify-between gap-3">
        <div className="space-y-0.5 sm:space-y-2 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">{title}</p>
          <p className={cn(
            "text-lg sm:text-2xl font-bold tracking-tight truncate",
            type === 'income' && "text-income",
            type === 'expense' && "text-expense",
            type === 'balance' && "text-foreground",
          )}>
            {formatCurrency(amount)}
          </p>
        </div>
        <div className={cn(
          "flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl",
          type === 'income' && "gradient-income",
          type === 'expense' && "gradient-expense",
          type === 'balance' && "gradient-primary",
        )}>
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
};
