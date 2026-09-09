import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { useTheme } from "@/src/theme";
import { IconSymbol } from "./ui/icon-symbol";

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  icon?: string;
  disabled?: boolean;
}

export function Button({ title, onPress, style, icon = "arrow.right", disabled }: ButtonProps) {
  const { colors, typography, radii } = useTheme();

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: disabled ? colors.textDisabled : colors.primary,
          borderRadius: radii.button,
          opacity: pressed && !disabled ? 0.8 : 1,
        },
        style,
      ]}
    >
      <Text style={[styles.text, typography.subtitle, { color: colors.onPrimary }]}>
        {title}
      </Text>
      {icon && (
        <IconSymbol
          name={icon as any}
          size={20}
          color={colors.onPrimary}
          style={styles.icon}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: "100%",
    shadowColor: "#5F33E1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  text: {
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    right: 24,
  },
});
