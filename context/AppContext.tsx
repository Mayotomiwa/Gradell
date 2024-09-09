import React, { ReactNode, useContext } from "react";
import uuid from "react-native-uuid";
import useAsyncStorage from "../hooks/useAsyncStorage";


// Define Budget and Expense interfaces
interface Budget {
  id: string;
  name: string;
  max: number;
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  budgetId: string;
}

// Define context types
interface BudgetsContextType {
  budgets: Budget[];
  expenses: Expense[];
  getBudgetExpenses: (budgetId: string) => Expense[];
  addExpense: (expense: { description: string; amount: number; budgetId: string }) => void;
  addBudget: (budget: { name: string; max: number }) => void;
  deleteBudget: (budget: { id: string }) => void;
  deleteExpense: (expense: { id: string }) => void;
}

// Create a context with default values
const BudgetsContext = React.createContext<BudgetsContextType | undefined>(undefined);

// Custom hook for using budgets
export function useBudgets() {
  const context = useContext(BudgetsContext);
  if (!context) {
    throw new Error("useBudgets must be used within a BudgetsProvider");
  }
  return context;
}

// BudgetsProvider component props
interface BudgetsProviderProps {
  children: ReactNode;
}

export const BudgetsProvider: React.FC<BudgetsProviderProps> = ({ children }) => {
  const [budgets, setBudgets] = useAsyncStorage<Budget[]>("budgets", []);
  const [expenses, setExpenses] = useAsyncStorage<Expense[]>("expenses", []);

  // Get expenses for a specific budget
  function getBudgetExpenses(budgetId: string): Expense[] {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  // Add a new expense
  function addExpense({ description, amount, budgetId }: { description: string; amount: number; budgetId: string }) {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      { id: uuid.v4() as string, description, amount, budgetId },
    ]);
  }

  // Add a new budget
  function addBudget({ name, max }: { name: string; max: number }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuid.v4() as string, name, max }];
    });
  }

  // Delete a budget and reassign its expenses to Uncategorized
  function deleteBudget({ id }: { id: string }) {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.budgetId !== id));
  
    setBudgets((prevBudgets) => prevBudgets.filter((budget) => budget.id !== id));
  }
  

  // Delete an expense
  function deleteExpense({ id }: { id: string }) {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
