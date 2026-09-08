import { DangerButton } from "@/src/components/tasks/danger-button";
import { PrimaryButton } from "@/src/components/tasks/primary-button";
import { useTheme } from "@/src/theme";
import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import styles from "./category-dialog-styles";

export interface CategoryDialogProps {
  title: string;
  visible: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  submitting?: boolean;
}

export function CategoryDialog({
  title,
  visible,
  onClose,
  onSubmit,
  submitting = false,
}: CategoryDialogProps) {
  const theme = useTheme();
  const [name, setName] = useState("");

  const trimmedName = name.trim();

  const handleClose = () => {
    setName("");
    onClose();
  };

  const handleSubmit = () => {
    if (!trimmedName) return;
    onSubmit(trimmedName);
    setName("");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <Pressable style={styles.backdrop} onPress={handleClose}>
        {/* Stop taps on the card itself from closing the dialog via the backdrop's onPress. */}
        <Pressable
          onPress={(event) => event.stopPropagation()}
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radii.card,
              padding: theme.spacing[24],
              ...theme.elevation.level1,
            },
          ]}
        >
          <Text
            style={[
              theme.typography.heading2,
              styles.title,
              { color: theme.colors.textPrimary },
            ]}
          >
            {title}
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Category name"
            placeholderTextColor={theme.colors.textSecondary}
            autoFocus
            editable={!submitting}
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
            style={[
              theme.typography.body,
              styles.input,
              {
                backgroundColor: theme.colors.background,
                borderRadius: theme.radii.md,
                color: theme.colors.textPrimary,
                marginTop: theme.spacing[16],
                padding: theme.spacing[12],
              },
            ]}
          />

          <View
            style={[
              styles.buttonRow,
              { marginTop: theme.spacing[24], gap: theme.spacing[12] },
            ]}
          >
            <View style={styles.buttonSlot}>
              <PrimaryButton
                label="Add"
                onPress={handleSubmit}
                loading={submitting}
                disabled={!trimmedName}
              />
            </View>
            <View style={styles.buttonSlot}>
              <DangerButton
                label="Cancel"
                onPress={handleClose}
                disabled={submitting}
              />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
