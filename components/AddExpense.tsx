import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "@/context/AppContext";
import { AddExpenseProps } from "@/types/Expense";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Text } from "@react-native-material/core";
import { Picker } from "@react-native-picker/picker";
import React, { useRef, useState } from "react";
import {
    GestureResponderEvent,
    Keyboard,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import {
    Button,
    IconButton,
    Modal,
    Portal,
    Provider,
} from "react-native-paper";
import Colors from "../constants/Colors";

export default function AddExpense({
  show,
  handleClose,
  defaultBudgetId,
}: AddExpenseProps) {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [budgetId, setBudgetId] = useState<string>(defaultBudgetId);

  const descriptionRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);
  const budgetIdRef = useRef<Picker<string>>(null);

  const { addExpense, budgets } = useBudgets();

  const handleSubmit = (e: GestureResponderEvent) => {
    e.preventDefault();
    addExpense({
      description,
      amount: parseFloat(amount),
      budgetId,
    });
    handleClose();
  };

  const handleDescriptionChangeText = (text: string) => {
    setDescription(text);
  };

  const handleAmountChangeText = (text: string) => {
    setAmount(text);
  };

  const handleIdChangeText = (itemValue: string) => {
    setBudgetId(itemValue);
  };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={show}
          onDismiss={handleClose}
          contentContainerStyle={styles.containerStyle}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <View style={styles.hStack}>
                <Text variant="h5" style={styles.header}>
                  Add Expense
                </Text>
                <IconButton
                  icon={() => <Icon name="close" style={styles.icon} />}
                  onPress={handleClose}
                />
              </View>
              <View>
                <Text variant="h6" style={styles.text}>
                  Description
                </Text>
                <TextInput
                  value={description}
                  ref={descriptionRef}
                  onChangeText={handleDescriptionChangeText}
                  style={[styles.input, styles.inputContainer]}
                  placeholder="Enter description"
                />
                <Text variant="h6" style={styles.text}>
                  Amount
                </Text>
                <TextInput
                  value={amount}
                  ref={amountRef}
                  onChangeText={handleAmountChangeText}
                  style={[styles.input, styles.inputContainer]}
                  keyboardType="numeric"
                  placeholder="Enter amount"
                />
                <Text variant="h6" style={styles.budgetText}>
                  Budget
                </Text>
                <Picker
                  selectedValue={budgetId}
                  onValueChange={handleIdChangeText}
                  ref={budgetIdRef}
                  mode="dropdown"
                  style={styles.pickerContainer}
                >
                  <Picker.Item
                    label="Uncategorized"
                    value={UNCATEGORIZED_BUDGET_ID}
                  />
                  {budgets.map((budget) => (
                    <Picker.Item
                      label={budget.name}
                      value={budget.id}
                      key={budget.id}
                    />
                  ))}
                </Picker>
              </View>
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.btn}
                labelStyle={{
                  fontStyle: "italic",
                  fontWeight: "bold",
                  color: Colors.white,
                }}
              >
                Add
              </Button>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    height: "95%",
  },
  icon: {
    fontSize: 40,
    color: Colors.garde,
    marginBottom: 10,
  },
  btn: {
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 8,
    backgroundColor: Colors.garde,
  },
  text: {
    marginTop: 20,
    fontStyle: "italic",
    textAlign: "left",
    marginBottom: 5,
  },
  budgetText: {
    textAlign: "left",
    fontStyle: "italic",
  },
  header: {
    textAlign: "left",
    fontStyle: "italic",
    marginBottom: 20,
    fontWeight: "bold",
    width: "60%",
  },
  inputContainer: {
    height: 55,
    width: "90%",
    backgroundColor: Colors.white,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: Colors.garde,
  },
  pickerContainer: {
    paddingRight: 10,
    marginTop: -50,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
  hStack: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
});
