import { useState } from 'react';
import { SummaryCard } from '@/components/SummaryCard';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { CategoryManager } from '@/components/CategoryManager';
import { useTransactions } from '@/hooks/useTransactions';
import { useCategories } from '@/hooks/useCategories';
import { Wallet } from 'lucide-react';
import { TransactionType } from '@/types/transaction';

const Index = () => {
  const { transactions, addTransaction, deleteTransaction, totals } = useTransactions();
  const { incomeCategories, expenseCategories, addCategory, deleteCategory, getCategories } = useCategories();
  const [formType, setFormType] = useState<TransactionType>('expense');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl gradient-primary shadow-glow">
                <Wallet className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-xl font-bold text-foreground truncate">Gelir Gider Takibi</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Günlük finansal durumunuz</p>
              </div>
            </div>
            <CategoryManager
              incomeCategories={incomeCategories}
              expenseCategories={expenseCategories}
              onAddCategory={addCategory}
              onDeleteCategory={deleteCategory}
            />
          </div>
        </div>
      </header>

      <main className="container px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <SummaryCard 
            title="Toplam Gelir" 
            amount={totals.income} 
            type="income"
            delay={0}
          />
          <SummaryCard 
            title="Toplam Gider" 
            amount={totals.expense} 
            type="expense"
            delay={100}
          />
          <SummaryCard 
            title="Net Bakiye" 
            amount={totals.balance} 
            type="balance"
            delay={200}
          />
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Transaction Form */}
          <section className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-card animate-fade-in">
              <h2 className="text-base sm:text-lg font-bold text-foreground mb-4 sm:mb-5">Yeni İşlem</h2>
              <TransactionForm 
                onSubmit={addTransaction} 
                categories={getCategories(formType)}
                onTypeChange={setFormType}
              />
            </div>
          </section>

          {/* Transaction List */}
          <section className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-card animate-fade-in">
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <h2 className="text-base sm:text-lg font-bold text-foreground">Son İşlemler</h2>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {transactions.length} işlem
                </span>
              </div>
              <TransactionList 
                transactions={transactions} 
                onDelete={deleteTransaction} 
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
