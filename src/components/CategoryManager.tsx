import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TransactionType } from '@/types/transaction';
import { Settings, Plus, X, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryManagerProps {
  incomeCategories: string[];
  expenseCategories: string[];
  onAddCategory: (type: TransactionType, category: string) => void;
  onDeleteCategory: (type: TransactionType, category: string) => void;
}

export const CategoryManager = ({
  incomeCategories,
  expenseCategories,
  onAddCategory,
  onDeleteCategory,
}: CategoryManagerProps) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TransactionType>('expense');
  const [newCategory, setNewCategory] = useState('');

  const categories = activeTab === 'income' ? incomeCategories : expenseCategories;

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(activeTab, newCategory.trim());
      setNewCategory('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCategory();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          Kategoriler
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Kategori Yönetimi</DialogTitle>
        </DialogHeader>

        {/* Tab Toggle */}
        <div className="flex gap-2 p-1 bg-secondary rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('expense')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm",
              activeTab === 'expense'
                ? "bg-expense text-expense-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <TrendingDown className="h-4 w-4" />
            Gider
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('income')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm",
              activeTab === 'income'
                ? "bg-income text-income-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <TrendingUp className="h-4 w-4" />
            Gelir
          </button>
        </div>

        {/* Add New Category */}
        <div className="flex gap-2">
          <Input
            placeholder="Yeni kategori adı..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button
            onClick={handleAddCategory}
            disabled={!newCategory.trim()}
            className="shrink-0 gradient-primary"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Category List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {categories.map((category) => (
            <div
              key={category}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl border",
                activeTab === 'income' 
                  ? "bg-income-bg border-income/20" 
                  : "bg-expense-bg border-expense/20"
              )}
            >
              <span className="font-medium text-foreground">{category}</span>
              <button
                onClick={() => onDeleteCategory(activeTab, category)}
                className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                aria-label={`${category} kategorisini sil`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Henüz kategori eklenmemiş
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
