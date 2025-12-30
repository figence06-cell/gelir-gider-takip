import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TransactionType, INCOME_CATEGORIES, EXPENSE_CATEGORIES, Transaction } from '@/types/transaction';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
}

export const TransactionForm = ({ onSubmit }: TransactionFormProps) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description || !category) return;

    onSubmit({
      type,
      amount: parseFloat(amount),
      description,
      category,
      date: new Date(),
    });

    setAmount('');
    setDescription('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Type Toggle */}
      <div className="flex gap-2 p-1 bg-secondary rounded-xl">
        <button
          type="button"
          onClick={() => { setType('expense'); setCategory(''); }}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all duration-200",
            type === 'expense' 
              ? "bg-expense text-expense-foreground shadow-md" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <TrendingDown className="h-4 w-4" />
          Gider
        </button>
        <button
          type="button"
          onClick={() => { setType('income'); setCategory(''); }}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all duration-200",
            type === 'income' 
              ? "bg-income text-income-foreground shadow-md" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <TrendingUp className="h-4 w-4" />
          Gelir
        </button>
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-sm font-medium">Tutar (₺)</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="h-12 text-lg font-semibold"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">Açıklama</Label>
        <Input
          id="description"
          placeholder="İşlem açıklaması..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-12"
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Kategori</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Kategori seçin" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full h-12 text-base font-semibold gradient-primary hover:opacity-90 transition-opacity"
        disabled={!amount || !description || !category}
      >
        <Plus className="h-5 w-5 mr-2" />
        İşlem Ekle
      </Button>
    </form>
  );
};
