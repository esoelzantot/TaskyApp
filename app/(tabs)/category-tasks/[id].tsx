import { CategoryTasksScreen } from "@/src/screens/tasks/category-tasks-screen"; // ← محتاج المسار الصح
import { useLocalSearchParams } from "expo-router";

export default function CategoryTasksRoute() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  return <CategoryTasksScreen categoryId={id} name={name} />;
}
