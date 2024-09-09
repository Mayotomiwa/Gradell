import Colors from "@/constants/Colors";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface ProgressProps {
  now: number;
  max: number;
  height: number;
}

export default function Progress({ now, max, height }: ProgressProps) {
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [reactive, animatedValue]);

  useEffect(() => {
    reactive.setValue(-width + (width * now) / max);
  }, [now, width, reactive]);

  return (
    <View
      onLayout={(e) => {
        const newWidth = e.nativeEvent.layout.width;
        setWidth(newWidth);
      }}
      style={[
        styles.container,
        {
          height,
          backgroundColor: now >= max * 0.9 ? Colors.red : Colors.bar,
          borderRadius: height,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.animatedBar,
          {
            height,
            borderRadius: height,
            transform: [{ translateX: animatedValue }],
            backgroundColor:
              now >= max * 0.75
                ? Colors.red
                : now >= max * 0.5
                ? Colors.warning
                : Colors.garde,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  animatedBar: {
    width: "100%",
    position: "absolute",
    left: 0,
    top: 0,
  },
});
