export interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string; // YYYY-MM-DD
  priority: string;
  completed: boolean;
  category_id: number | null;
  category_name: string | null;
}

export type DailyPlannerResponse = Task[];
