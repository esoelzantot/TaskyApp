import { HomeHeader } from "@/src/components/home-header/home-header";
import { HomeProgressCard } from "@/src/components/home-progress-card/home-progress-card";
import { InProgressSection } from "@/src/components/in-progress-section/in-progress-section";
import { useTheme } from "@/src/theme";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const PLACEHOLDER_IN_PROGRESS_TASKS = [
    {
      id: "1",
      category: "Office Project",
      title: "Grocery shopping app design",
    },
    {
      id: "2",
      category: "Personal Project",
      title: "Uber Eats redesign challenge",
    },
    { id: "3", category: "Office Project", title: "Onboarding flow revamp" },
  ];

  return (
    <ScrollView
      style={[{ backgroundColor: theme.colors.background }]}
      contentContainerStyle={{
        paddingHorizontal: theme.spacing[24],
        paddingTop: insets.top + theme.spacing[16],
        paddingBottom: theme.spacing[24],
      }}
    >
      <View>
        {/* TODO: replace with the signed-in user's real name/avatar once auth exists. */}
        <HomeHeader userName="User" />
      </View>

      <View style={{ marginTop: theme.spacing[24] }}>
        {/* TODO: replace with the real "completed today / total today" ratio once tasks exist. */}
        <HomeProgressCard percentage={85} />
      </View>

      <View style={{ marginTop: theme.spacing[24] }}>
        <InProgressSection tasks={PLACEHOLDER_IN_PROGRESS_TASKS} />
      </View>
    </ScrollView>
  );
}
