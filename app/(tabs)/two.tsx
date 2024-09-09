import Colors from "@/constants/Colors";
import { useBudgets } from "@/context/AppContext";
import { currencyFormatter } from "@/utils/curencyFormatter";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";


const ExpensesList = () => {
  const { expenses, budgets } = useBudgets();

  const budgetNameMap = React.useMemo(() => {
    const map = new Map();
    budgets.forEach(budget => map.set(budget.id, budget.name));
    return map;
  }, [budgets]);

  const renderExpenseItem = ({ item }: { item: any }) => (
    <View style={styles.expenseItem}>
      <View style={styles.expenseRow}>
        <Text style={styles.expenseDescription}>{item.description}</Text>
        <Text style={styles.expenseAmount}>{currencyFormatter.format(item.amount)}</Text>
      </View>
      <Text style={styles.expenseBudget}>Budget: {budgetNameMap.get(item.budgetId) || "Unknown"}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.noExpensesText}>No expenses available</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  expenseItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  expenseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expenseDescription: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expenseAmount: {
    fontSize: 16,
    color: Colors.garde,
  },
  expenseBudget: {
    fontSize: 14,
    color: "#555",
  },
  noExpensesText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: Colors.grey,
  },
});

export default ExpensesList;
