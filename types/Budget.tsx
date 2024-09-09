import { Expense } from "./Expense";
export interface Budget {
  id: string;
  name: string;
  max: number;
}

export interface BudgetCardProps {
  name: string;
  amount: number;
  max: number;
  onAddExpenseClick?: () => void;
  onViewExpensesClick?: () => void;
  hideButtons?: boolean;
  Total?: boolean;
}

export interface BudgetStore {
  budgets: Budget[];
  expenses: Expense[];
  getBudgetExpenses: (budgetId: string) => Expense[];
  addExpense: (expense: {
    description: string;
    amount: number;
    budgetId: string;
  }) => void;
  addBudget: (budget: { name: string; max: number }) => void;
  deleteBudget: (budget: { id: string }) => void;
  deleteExpense: (expense: { id: string }) => void;
}

export interface AddBudgetProps {
  show: boolean;
  handleClose: () => void;
}
