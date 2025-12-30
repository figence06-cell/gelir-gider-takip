import { SummaryCard } from '@/components/SummaryCard';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { useTransactions } from '@/hooks/useTransactions';
import { Wallet } from 'lucide-react';

const Index = () => {
  const { transactions, addTransaction, deleteTransaction, totals } = useTransactions();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-glow">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Gelir Gider Takibi</h1>
              <p className="text-sm text-muted-foreground">Günlük finansal durumunuz</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transaction Form */}
          <section className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card animate-fade-in">
              <h2 className="text-lg font-bold text-foreground mb-5">Yeni İşlem</h2>
              <TransactionForm onSubmit={addTransaction} />
            </div>
          </section>

          {/* Transaction List */}
          <section className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card animate-fade-in">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-foreground">Son İşlemler</h2>
                <span className="text-sm text-muted-foreground">
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
