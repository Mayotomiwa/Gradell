import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Portal, Provider } from "react-native-paper";

import AddBudget from "@/components/AddBudget";
import AddExpense from "@/components/AddExpense";
import BudgetCard from "@/components/BudgetCard";
import TotalCard from "@/components/TotalCard";
import ViewExpenses from "@/components/ViewExpense";
import Colors from "@/constants/Colors";
import { useBudgets } from "@/context/AppContext";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { budgets, getBudgetExpenses } = useBudgets();

  const [showAddBudgetModal, setShowAddBudgetModal] = useState<boolean>(false);
  const [showExpense, setShowExpense] = useState<string | null>(null);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState<boolean>(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [alertShown, setAlertShown] = useState<boolean>(false);

  const openAddExpenseModal = (budgetId: string) => {
    setShowAddExpenseModal(true);
    setShowExpense(budgetId);
  };

  const loaded = () => {
    setDataLoaded(budgets.length > 0);
  };

  useEffect(() => {
    loaded();
  }, [budgets]);

  // This useEffect is now outside the renderItem
  useEffect(() => {
    const overBudgetItem = budgets.find((item) => {
      const amount = getBudgetExpenses(item.id).reduce(
        (total, expense) => total + expense.amount,
        0
      );
      return amount > item.max;
    });

    if (overBudgetItem && !alertShown) {
      Alert.alert(
        "Over Budget",
        `You have exceeded your budget for ${overBudgetItem.name}`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      setAlertShown(true);
    } else if (!overBudgetItem) {
      // Reset alertShown when there is no over-budget item
      setAlertShown(false);
    }
  }, [budgets, alertShown, getBudgetExpenses]);

  const renderItem = ({ item }: { item: any }) => {
    const amount = getBudgetExpenses(item.id).reduce(
      (total, expense) => total + expense.amount,
      0
    );

    return (
      <BudgetCard
        key={item.id}
        name={item.name}
        amount={amount}
        max={item.max}
        onAddExpenseClick={() => openAddExpenseModal(item.id)}
        onViewExpensesClick={() => setViewExpensesModalBudgetId(item.id)}
      />
    );
  };

  const ListEmptyComponent = !dataLoaded ? (
    <View style={styles.placeholderContainer}>
      <Image
        source={require("@/assets/images/noData.png")}
        style={styles.placeholderImage}
      />
      <Text style={styles.dataText}>No budget available yet</Text>
    </View>
  ) : null;

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.name}>Gradell Finance</Text>
        <View style={styles.subTextContainer}>
          <Text style={styles.subText}>
            Hi There{" "}
            <View>
              <Icon name="hand-wave" style={styles.icon} />
            </View>
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setShowAddBudgetModal(true)}
          >
            <Text style={styles.btnText2}>Add Budget</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn2}
            onPress={() => showExpense && openAddExpenseModal(showExpense)}
          >
            <Text style={styles.btnText1}>Add Expense</Text>
          </TouchableOpacity>
        </View>
        <TotalCard />

        <FlatList
          data={budgets}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.bodyContainer}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
      {showAddBudgetModal && (
        <Portal>
          <AddBudget
            show={showAddBudgetModal}
            handleClose={() => setShowAddBudgetModal(false)}
          />
        </Portal>
      )}
      {showAddExpenseModal && (
        <Portal>
          <AddExpense
            show={showAddExpenseModal}
            defaultBudgetId={showExpense || ""}
            handleClose={() => setShowAddExpenseModal(false)}
          />
        </Portal>
      )}
      {viewExpensesModalBudgetId && (
        <Portal>
          <ViewExpenses
            budgetId={viewExpensesModalBudgetId}
            handleClose={() => setViewExpensesModalBudgetId(null)}
          />
        </Portal>
      )}
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 40,
  },
  name: {
    marginHorizontal: 20,
    fontStyle: "italic",
    fontSize: 32,
    color: Colors.garde,
  },
  subTextContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  subText: {
    fontStyle: "italic",
    fontSize: 20,
    color: Colors.garde,
  },
  icon: {
    fontSize: 30,
    color: Colors.warning,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  btn: {
    backgroundColor: Colors.garde,
    padding: 10,
    width: "48%",
    borderRadius: 4,
    alignItems: "center",
  },
  btn2: {
    borderColor: Colors.garde,
    borderWidth: 2,
    padding: 10,
    width: "48%",
    borderRadius: 4,
    alignItems: "center",
  },
  btnText1: {
    color: Colors.garde,
    fontSize: 16,
  },
  btnText2: {
    color: Colors.white,
    fontSize: 16,
  },
  bodyContainer: {
    flexGrow: 1,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    marginTop: 60,
    opacity: 0.4,
    width: 200,
    height: 200,
  },
  dataText: {
    marginTop: 20,
    fontSize: 25,
    opacity: 0.4,
  },
});

export default Home;
