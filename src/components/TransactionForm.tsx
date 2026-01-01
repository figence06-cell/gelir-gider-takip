import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { TransactionType, Transaction } from '@/types/transaction';
import { Plus, TrendingUp, TrendingDown, CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  categories: string[];
  onTypeChange: (type: TransactionType) => void;
}

export const TransactionForm = ({ onSubmit, categories, onTypeChange }: TransactionFormProps) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    setCategory('');
  }, [type]);

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    onTypeChange(newType);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description || !category) return;

    onSubmit({
      type,
      amount: parseFloat(amount),
      description,
      category,
      date,
    });

    setAmount('');
    setDescription('');
    setCategory('');
    setDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Type Toggle */}
      <div className="flex gap-2 p-1 bg-secondary rounded-xl">
        <button
          type="button"
          onClick={() => handleTypeChange('expense')}
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
          onClick={() => handleTypeChange('income')}
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

      {/* Date */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Tarih</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full h-12 justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "d MMMM yyyy", { locale: tr }) : <span>Tarih seçin</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => d && setDate(d)}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
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
