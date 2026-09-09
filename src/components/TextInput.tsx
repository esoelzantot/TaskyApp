import { StyleSheet, Text, TextInput as RNTextInput, TextInputProps, View, ViewStyle } from "react-native";
import { useTheme } from "@/src/theme";
import { IconSymbol, IconSymbolName } from "./ui/icon-symbol";

interface InputProps extends TextInputProps {
  label: string;
  icon?: IconSymbolName;
  containerStyle?: ViewStyle;
  error?: string;
}

export function TextInput({ label, icon, containerStyle, error, ...props }: InputProps) {
  const { colors, typography, radii, spacing } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[typography.bodyBold, { color: colors.textPrimary, marginBottom: spacing[8] }]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.primaryMuted,
            borderRadius: radii.sm,
            borderColor: error ? colors.error : colors.primaryLight,
            borderWidth: 1,
          },
        ]}
      >
        {icon && (
          <IconSymbol
            name={icon}
            size={20}
            color={colors.textDisabled}
            style={styles.icon}
          />
        )}
        <RNTextInput
          style={[
            styles.input,
            typography.body,
            { color: colors.textPrimary },
          ]}
          placeholderTextColor={colors.textDisabled}
          {...props}
        />
      </View>
      {error ? (
        <Text style={[typography.caption, { color: colors.error, marginTop: 4 }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 52,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: "100%",
  },
});
