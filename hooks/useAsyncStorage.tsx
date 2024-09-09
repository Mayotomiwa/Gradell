import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function useAsyncStorage<T>(key: string, initValue: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initValue);

  useEffect(() => {
    const getStoredValue = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue != null) {
          setValue(JSON.parse(jsonValue));
        } else if (typeof initValue === "function") {
          setValue((initValue as () => T)());
        }
      } catch (e) {
        console.error(`Error retrieving item from AsyncStorage for key ${key}:`, e);
      }
    };

    getStoredValue();
  }, [key]);

  useEffect(() => {
    const storeValue = async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.error(`Error saving item to AsyncStorage for key ${key}:`, e);
      }
    };

    storeValue();
  }, [key, value]);

  return [value, setValue];
}
