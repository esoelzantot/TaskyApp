import { DangerButton } from "@/src/components/tasks/danger-button";
import { PrimaryButton } from "@/src/components/tasks/primary-button";
import { useTheme } from "@/src/theme";
import { Modal, Pressable, Text, View } from "react-native";
import styles from "./confirm-dialog-styles";

export interface ConfirmDialogProps {
  title: string;
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export function ConfirmDialog({
  title,
  visible,
  onClose,
  onSubmit,
}: ConfirmDialogProps) {
  const theme = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
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
              {
                color: theme.colors.textPrimary,
              },
            ]}
          >
            {title}
          </Text>

          <View
            style={[
              styles.buttonRow,
              {
                marginTop: theme.spacing[24],
                gap: theme.spacing[12],
              },
            ]}
          >
            <View style={styles.buttonSlot}>
              <PrimaryButton label="Confirm" onPress={onSubmit} />
            </View>

            <View style={styles.buttonSlot}>
              <DangerButton label="Cancel" onPress={onClose} />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
