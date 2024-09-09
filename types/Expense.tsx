
export interface Expense {
  id: string;
  description: string;
  amount: number;
  budgetId: string;
}



export interface AddExpenseProps {
    show: boolean;
    handleClose: () => void;
    defaultBudgetId: string;
  }