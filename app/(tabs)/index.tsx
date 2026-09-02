import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/src/theme';

/**
 * Placeholder Home screen — proves out the theme foundation end to end
 * (fonts, colors, spacing). Replace with real Tasky screens as features
 * land in `src/screens`.
 */
export default function HomeScreen() {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background, padding: theme.spacing[24] },
      ]}>
      <Text style={[styles.title, theme.typography.heading1, { color: theme.colors.textPrimary }]}>
        Tasky
      </Text>
      <Text
        style={[
          styles.subtitle,
          theme.typography.body,
          { color: theme.colors.textSecondary, marginTop: theme.spacing[8] },
        ]}>
        Project structure and theme foundation ready.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {},
  subtitle: {
    textAlign: 'center',
  },
});
