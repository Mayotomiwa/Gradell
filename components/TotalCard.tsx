import BudgetCard from '@/components/BudgetCard';
import { useBudgets } from '@/context/AppContext';
import React from 'react';

interface Expense {
    amount: number;
}

interface Budget {
    max: number;
}

export default function TotalCard(): JSX.Element | null {
    const { expenses, budgets } = useBudgets();

    const amount: number = expenses.reduce((total: number, expense: Expense) => total + expense.amount, 0);
    const max: number = budgets.reduce((total: number, budget: Budget) => total + budget.max, 0);

    if (max === 0) {
        return null;
    }

    return (
        <BudgetCard name="Total" amount={amount} max={max} hideButtons />
    );
}
