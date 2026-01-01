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
    <div className="space-y-2 sm:space-y-3">
      {transactions.map((transaction, index) => (
        <div
          key={transaction.id}
          className={cn(
            "group flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-card border border-border",
            "shadow-card hover:shadow-card-hover transition-all duration-200",
            "animate-slide-up"
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Icon */}
          <div className={cn(
            "flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl",
            transaction.type === 'income' ? "bg-income-bg" : "bg-expense-bg"
          )}>
            {transaction.type === 'income' ? (
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-income" />
            ) : (
              <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-expense" />
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <p className="font-semibold text-sm sm:text-base text-foreground truncate">
                {transaction.description}
              </p>
              <span className={cn(
                "self-start shrink-0 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium",
                transaction.type === 'income' 
                  ? "bg-income-bg text-income" 
                  : "bg-expense-bg text-expense"
              )}>
                {transaction.category}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {format(new Date(transaction.date), 'd MMMM yyyy', { locale: tr })}
            </p>
          </div>

          {/* Amount & Delete */}
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-3 shrink-0">
            <p className={cn(
              "font-bold text-sm sm:text-lg",
              transaction.type === 'income' ? "text-income" : "text-expense"
            )}>
              {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
            </p>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(transaction.id)}
              className="p-1.5 sm:p-2 rounded-lg sm:opacity-0 sm:group-hover:opacity-100 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all duration-200"
              aria-label="Sil"
            >
              <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
