import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text, View } from "react-native";

import { useTheme } from "@/src/theme";

interface CategoriesEmptyStateProps {
  onCreatePress?: () => void;
  isSearchResult?: boolean;
}

export function CategoriesEmptyState({
  onCreatePress,
  isSearchResult = false,
}: CategoriesEmptyStateProps) {
  const theme = useTheme();

  if (isSearchResult) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: theme.spacing[24],
          paddingHorizontal: theme.spacing[24],
        }}
      >
        <View
          style={{
            width: 64,
            height: 64,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.primarySurface,
            borderRadius: theme.radii.full,
          }}
        >
          <MaterialIcons
            name="search-off"
            size={30}
            color={theme.colors.primary}
          />
        </View>

        <Text
          style={[
            theme.typography.heading2,
            {
              color: theme.colors.textPrimary,
              textAlign: "center",
              marginTop: theme.spacing[16],
            },
          ]}
        >
          No Task Groups Found
        </Text>

        <Text
          style={[
            theme.typography.body,
            {
              color: theme.colors.textSecondary,
              textAlign: "center",
              marginTop: theme.spacing[8],
              lineHeight: 22,
            },
          ]}
        >
          Try searching with a different task group name.
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: theme.spacing[24],
        paddingHorizontal: theme.spacing[24],
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.primarySurface,
          borderRadius: theme.radii.full,
        }}
      >
        <MaterialIcons name="category" size={38} color={theme.colors.primary} />
      </View>

      <Text
        style={[
          theme.typography.heading2,
          {
            color: theme.colors.textPrimary,
            textAlign: "center",
            marginTop: theme.spacing[20],
          },
        ]}
      >
        No Task Groups Yet
      </Text>

      <Text
        style={[
          theme.typography.body,
          {
            color: theme.colors.textSecondary,
            textAlign: "center",
            marginTop: theme.spacing[8],
            lineHeight: 22,
            maxWidth: 300,
          },
        ]}
      >
        Create your first task group to keep your tasks organized and easy to
        manage.
      </Text>

      {onCreatePress && (
        <Pressable
          onPress={onCreatePress}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: theme.spacing[20],
            paddingHorizontal: theme.spacing[20],
            paddingVertical: theme.spacing[12],
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radii.md,
            gap: theme.spacing[8],
            ...theme.elevation.level1,
          }}
        >
          <MaterialIcons name="add" size={20} color={theme.colors.onPrimary} />

          <Text
            style={[
              theme.typography.bodyBold,
              {
                color: theme.colors.onPrimary,
              },
            ]}
          >
            Create Task Group
          </Text>
        </Pressable>
      )}
    </View>
  );
}
