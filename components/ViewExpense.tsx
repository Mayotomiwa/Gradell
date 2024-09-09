import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '@/context/AppContext';
import { currencyFormatter } from '@/utils/curencyFormatter';
import Colors from '../constants/Colors';

interface ViewExpensesProps {
    budgetId: string | null;
    handleClose: () => void;
}

const ViewExpenses: React.FC<ViewExpensesProps> = ({ budgetId, handleClose }) => {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();

    const budget = UNCATEGORIZED_BUDGET_ID === budgetId
        ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
        : budgets.find(b => b.id === budgetId);

    const expenses = getBudgetExpenses(budgetId || '');

    return (
        <Modal
            visible={budgetId != null}
            onRequestClose={handleClose}
            transparent
        >
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>
                            Expense - {budget?.name}
                        </Text>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => {
                                    if (budget) {
                                        deleteBudget(budget);
                                    }
                                    handleClose();
                                }}
                            >
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={handleClose}>
                            <Icon style={styles.icon} name="close" />
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 5}}>
                        {expenses.map(expense => (
                            <View key={expense.id} style={styles.expenseItem}>
                                <View style={styles.description}>
                                    <Text style={styles.expenseText}>
                                        {expense.description}
                                    </Text>
                                </View>
                                <View style={styles.amount}>
                                    <Text style={styles.expenseText}>
                                        {currencyFormatter.format(expense.amount)}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => deleteExpense(expense)}>
                                    <Icon style={styles.icon2} name="delete" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    scrollView: {
        backgroundColor: 'white',
        padding: 10,
        marginTop: 200,
        alignItems: 'center',
        height: "50%",
        width: '95%'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    header: {
        fontSize: 20,
        color: Colors.garde,
        fontStyle: 'italic',
        fontWeight: 'bold',
        width: '55%',
    },
    deleteButton: {
        padding: 5,
        borderColor: Colors.red,
        borderWidth: 2,
        marginHorizontal: -40,
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteButtonText: {
        color: Colors.red,
    },
    icon: {
        fontSize: 40,
        color: Colors.garde,
    },
    icon2: {
        fontSize: 30,
        color: Colors.red,
    },
    expenseItem: {
        flexDirection: 'row',
        alignItems: 'baseline',
        width: '100%',
        marginBottom: 10,
    },
    description: {
        width: '35%',
    },
    amount: {
        width: '35%',
    },
    expenseText: {
        fontSize: 16,
        color: Colors.garde,
    },
});

export default ViewExpenses;
