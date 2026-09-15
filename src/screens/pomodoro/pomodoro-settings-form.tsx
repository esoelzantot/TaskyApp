import { useState } from "react";
import { Text, TextInput, View } from "react-native";

import { PrimaryButton } from "@/src/components/tasks/primary-button";
import {
  DEFAULT_POMODORO_DURATIONS,
  type PomodoroDurations,
} from "@/src/models/pomodoro";
import { useTheme } from "@/src/theme";

export interface PomodoroSettingsFormProps {
  onSubmit: (durations: PomodoroDurations) => void;
}

interface NumberFieldProps {
  label: string;
  value: number;
  onChangeValue: (value: number) => void;
}

function NumberField({ label, value, onChangeValue }: NumberFieldProps) {
  const theme = useTheme();
  const [text, setText] = useState(String(value));

  const commit = () => {
    const parsed = Number(text);
    if (Number.isFinite(parsed) && parsed > 0) {
      onChangeValue(parsed);
    } else {
      // Invalid entry (empty, 0, negative, non-numeric) — revert to the last valid value.
      setText(String(value));
    }
  };

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii.card,
        padding: theme.spacing[16],
      }}
    >
      <Text
        style={[theme.typography.body, { color: theme.colors.textSecondary }]}
      >
        {label}
      </Text>
      <TextInput
        value={text}
        onChangeText={setText}
        onEndEditing={commit}
        keyboardType="number-pad"
        style={[
          theme.typography.heading2,
          {
            color: theme.colors.textPrimary,
            marginTop: theme.spacing[4],
            padding: 0,
          },
        ]}
      />
      <Text
        style={[
          theme.typography.caption,
          { color: theme.colors.textSecondary },
        ]}
      >
        minutes
      </Text>
    </View>
  );
}

export function PomodoroSettingsForm({ onSubmit }: PomodoroSettingsFormProps) {
  const theme = useTheme();
  const [durations, setDurations] = useState<PomodoroDurations>(
    DEFAULT_POMODORO_DURATIONS,
  );

  return (
    <View>
      <Text
        style={[
          theme.typography.heading1,
          { color: theme.colors.textPrimary, textAlign: "center" },
        ]}
      >
        Set Your Pomodoro
      </Text>
      <Text
        style={[
          theme.typography.body,
          {
            color: theme.colors.textSecondary,
            textAlign: "center",
            marginTop: theme.spacing[8],
          },
        ]}
      >
        Be productive the right way.
      </Text>

      <View style={{ marginTop: theme.spacing[24], gap: theme.spacing[16] }}>
        <NumberField
          label="Work"
          value={durations.work}
          onChangeValue={(work) => setDurations((prev) => ({ ...prev, work }))}
        />
        <NumberField
          label="Short Break"
          value={durations.short}
          onChangeValue={(short) =>
            setDurations((prev) => ({ ...prev, short }))
          }
        />
        <NumberField
          label="Long Break"
          value={durations.long}
          onChangeValue={(long) => setDurations((prev) => ({ ...prev, long }))}
        />
      </View>

      <View style={{ marginTop: theme.spacing[24] }}>
        <PrimaryButton label="Set Timer" onPress={() => onSubmit(durations)} />
      </View>
    </View>
  );
}
