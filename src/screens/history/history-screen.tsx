import { ScreenHeader } from "@/src/components/screen-header/screen-header";
import { ScrollView, View } from "react-native";

export default function HistoryScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title="Add Project" />

      <ScrollView contentContainerStyle={{ padding: 24 }}></ScrollView>
    </View>
  );
}
