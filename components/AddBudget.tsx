import { useBudgets } from "@/context/AppContext";
import { AddBudgetProps } from "@/types/Budget";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Text } from "@react-native-material/core";
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

export default function AddBudget({ show, handleClose }: AddBudgetProps) {
  const [name, setName] = useState<string>("");
  const [max, setMax] = useState<string>("");
  const nameRef = useRef<TextInput>(null);
  const maxRef = useRef<TextInput>(null);

  const { addBudget } = useBudgets();

  const handleSubmit = (e: GestureResponderEvent) => {
    e.preventDefault();
    addBudget({
      name,
      max: parseFloat(max),
    });
    handleClose();
  };

  const handleNameChangeText = (text: string) => {
    setName(text);
  };

  const handleNumChangeText = (text: string) => {
    setMax(text);
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
                  Add Budget
                </Text>
                <IconButton
                  icon={() => <Icon name="close" style={styles.icon} />}
                  onPress={handleClose}
                />
              </View>
              <View>
                <Text variant="h6" style={styles.text}>
                  Name
                </Text>
                <TextInput
                  value={name}
                  ref={nameRef}
                  onChangeText={handleNameChangeText}
                  style={[styles.input, styles.inputContainer]}
                  placeholder="Enter budget name"
                  maxLength={12}
                />
                <Text variant="h6" style={styles.text}>
                  Maximum Spending
                </Text>
                <TextInput
                  value={max}
                  ref={maxRef}
                  onChangeText={handleNumChangeText}
                  style={[styles.input, styles.inputContainer]}
                  keyboardType="numeric"
                  placeholder="Enter a number"
                />
              </View>
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.btn}
                labelStyle={{
                  fontStyle: "italic",
                  fontWeight: "bold",
                  color: "white",
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
    height: "80%",
    width: "100%",
  },
  icon: {
    fontSize: 40,
    fontWeight: "normal",
    textAlign: "right",
    color: Colors.garde,
    marginBottom: 10,
  },
  hStack: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  btn: {
    marginHorizontal: 20,
    marginVertical: 50,
    padding: 8,
    backgroundColor: Colors.garde,
  },
  text: {
    top: 20,
    fontStyle: "italic",
    textAlign: "left",
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
    flexDirection: "row",
    marginVertical: 30,
    padding: 10,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: Colors.garde,
  },
  input: {
    fontSize: 16,
    color: "black",
    borderColor: Colors.garde,
  },
});
