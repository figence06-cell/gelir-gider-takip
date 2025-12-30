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
        "relative overflow-hidden rounded-2xl p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1",
        type === 'income' && "bg-income-bg border border-income/20",
        type === 'expense' && "bg-expense-bg border border-expense/20",
        type === 'balance' && "bg-card border border-border",
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={cn(
            "text-2xl font-bold tracking-tight",
            type === 'income' && "text-income",
            type === 'expense' && "text-expense",
            type === 'balance' && "text-foreground",
          )}>
            {formatCurrency(amount)}
          </p>
        </div>
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl",
          type === 'income' && "gradient-income",
          type === 'expense' && "gradient-expense",
          type === 'balance' && "gradient-primary",
        )}>
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
};
