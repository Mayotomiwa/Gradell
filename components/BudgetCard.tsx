import Progress from '@/components/ProgressBar';
import Colors from '@/constants/Colors';
import { BudgetCardProps } from '@/types/Budget';
import { currencyFormatter } from '@/utils/curencyFormatter';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BudgetCard({
  name,
  amount,
  max,
  onAddExpenseClick,
  onViewExpensesClick,
  hideButtons = false,
  Total = false,
}: BudgetCardProps) {
  return (
    <View
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.currencyContainer}>
            <Text style={styles.currency}>{currencyFormatter.format(amount)}</Text>
            {max && <Text style={styles.currency2}> / {currencyFormatter.format(max)}</Text>}
          </Text>
        </View>
        <View style={!Total ? styles.ProgressBar : styles.ProgressBarTotal}>
          {max && <Progress now={amount} max={max} height={20} />}
        </View>
      </View>
      {!hideButtons && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.btn} onPress={onAddExpenseClick}>
            <Text style={styles.btnText}>Add Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2} onPress={onViewExpensesClick}>
            <Text style={styles.btnText2}>View Expense</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.AliceBlue,
    shadowColor: Colors.black,
    elevation: 5,
    shadowOpacity: 0.5,
    shadowOffset: {
        width: 5,
        height: 5,
    },
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    width: '96%',
    marginTop: 20,
    marginHorizontal: 5,
  },
  content: {
    width: '96%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: {
    fontStyle: 'italic',
    color: Colors.garde,
    fontSize: 24,
  },
  currencyContainer: {
  },
  currency: {
    display: 'flex',
    alignItems: 'baseline',
    fontSize: 18,
    color: Colors.garde,
  },
  currency2: {
    marginStart: 10,
    fontSize: 15,
    color: Colors.grey,
    fontWeight: 'bold',
  },
  ProgressBar: {
    paddingTop: 30,
    width: '100%',
    justifyContent: 'center',
  },
  ProgressBarTotal: {
    paddingTop: 30,
    width: '100%',
    justifyContent: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginTop: 20,
  },
  btn: {
    padding: 20,
    backgroundColor: Colors.garde,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btn2: {
    padding: 20,
    borderColor: Colors.garde,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  btnText2: {
    color: Colors.garde,
    fontWeight: 'bold',
  },
});
