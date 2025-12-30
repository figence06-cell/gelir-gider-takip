import { Transaction } from '@/types/transaction';
import { cn } from '@/lib/utils';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const TransactionList = ({ transactions, onDelete }: TransactionListProps) => {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-4">
          <TrendingUp className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">Henüz işlem yok</h3>
        <p className="text-sm text-muted-foreground">
          İlk işleminizi ekleyerek başlayın
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction, index) => (
        <div
          key={transaction.id}
          className={cn(
            "group flex items-center gap-4 p-4 rounded-xl bg-card border border-border",
            "shadow-card hover:shadow-card-hover transition-all duration-200",
            "animate-slide-up"
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Icon */}
          <div className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            transaction.type === 'income' ? "bg-income-bg" : "bg-expense-bg"
          )}>
            {transaction.type === 'income' ? (
              <TrendingUp className="h-5 w-5 text-income" />
            ) : (
              <TrendingDown className="h-5 w-5 text-expense" />
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-foreground truncate">
                {transaction.description}
              </p>
              <span className={cn(
                "shrink-0 px-2 py-0.5 rounded-md text-xs font-medium",
                transaction.type === 'income' 
                  ? "bg-income-bg text-income" 
                  : "bg-expense-bg text-expense"
              )}>
                {transaction.category}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {format(new Date(transaction.date), 'd MMMM yyyy, HH:mm', { locale: tr })}
            </p>
          </div>

          {/* Amount */}
          <p className={cn(
            "font-bold text-lg shrink-0",
            transaction.type === 'income' ? "text-income" : "text-expense"
          )}>
            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
          </p>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(transaction.id)}
            className="shrink-0 p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all duration-200"
            aria-label="Sil"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
