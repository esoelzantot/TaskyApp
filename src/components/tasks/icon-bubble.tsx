import React from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@/src/theme";

interface IconBubbleProps {
  backgroundColor: string;
  size?: number;
  children: React.ReactNode;
}

export function IconBubble({ backgroundColor, size = 40, children }: IconBubbleProps) {
  const { radii } = useTheme();

  return (
    <View
      style={[
        styles.bubble,
        { backgroundColor, width: size, height: size, borderRadius: radii.full },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    alignItems: "center",
    justifyContent: "center",
  },
});
