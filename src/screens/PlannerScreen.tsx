import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '@/src/theme';
import { useGetDailyTasksQuery, useGetWeeklyTasksQuery } from '@/src/apis/planner-api-slice';
import { formatApiDate, formatDisplayDate, addDays, getStartOfWeek } from '@/src/utils/date';
import { Task } from '@/src/models/task';
import { IconSymbol } from '@/src/components/ui/icon-symbol';

function TaskCard({ task }: { task: Task }) {
  const theme = useTheme();
  return (
    <View style={[styles.taskCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radii.card }]}>
      <View style={styles.taskHeader}>
        <Text style={[theme.typography.bodyBold, { color: theme.colors.textPrimary, flex: 1 }]}>{task.title}</Text>
        {task.completed && (
          <View style={[styles.badge, { backgroundColor: theme.colors.success }]}>
            <Text style={[theme.typography.small, { color: '#fff' }]}>Done</Text>
          </View>
        )}
      </View>
      {task.description ? (
        <Text style={[theme.typography.small, { color: theme.colors.textSecondary, marginTop: 4 }]}>{task.description}</Text>
      ) : null}
      <View style={styles.taskFooter}>
        <Text style={[theme.typography.small, { color: theme.colors.primary }]}>{task.priority}</Text>
        {task.category_name && (
          <Text style={[theme.typography.small, { color: theme.colors.textSecondary, marginLeft: 12 }]}>{task.category_name}</Text>
        )}
      </View>
    </View>
  );
}

function ErrorState({ error, onRetry }: { error: unknown; onRetry: () => void }) {
  const theme = useTheme();
  let message = "An unexpected error occurred.";
  if (error && typeof error === 'object') {
      if ('message' in error) message = String(error.message);
      if ('data' in error && error.data && typeof error.data === 'object' && 'detail' in error.data) {
          message = String((error.data as any).detail);
      }
  }

  return (
    <View style={styles.centerContainer}>
      <Text style={[theme.typography.body, { color: theme.colors.error, textAlign: 'center' }]}>{message}</Text>
      <TouchableOpacity style={[styles.retryButton, { backgroundColor: theme.colors.primary, borderRadius: theme.radii.button }]} onPress={onRetry}>
        <Text style={[theme.typography.subtitle, { color: theme.colors.onPrimary }]}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

function EmptyState({ message }: { message: string }) {
  const theme = useTheme();
  return (
    <View style={styles.centerContainer}>
      <IconSymbol name="calendar" size={48} color={theme.colors.border} />
      <Text style={[theme.typography.body, { color: theme.colors.textSecondary, marginTop: 16 }]}>{message}</Text>
    </View>
  );
}

function DailyView({ date }: { date: Date }) {
  const { data: tasks, isLoading, error, refetch } = useGetDailyTasksQuery(formatApiDate(date));
  const theme = useTheme();

  if (isLoading) return <View style={styles.centerContainer}><ActivityIndicator size="large" color={theme.colors.primary} /></View>;
  if (error) return <ErrorState error={error} onRetry={refetch} />;

  if (!tasks || tasks.length === 0) {
    return <EmptyState message="No tasks for this day. Enjoy your free time!" />;
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TaskCard task={item} />}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

function WeeklyView({ startDate }: { startDate: Date }) {
  const { data, isLoading, error, refetch } = useGetWeeklyTasksQuery(formatApiDate(startDate));
  const theme = useTheme();

  if (isLoading) return <View style={styles.centerContainer}><ActivityIndicator size="large" color={theme.colors.primary} /></View>;
  if (error) return <ErrorState error={error} onRetry={refetch} />;

  // Normalize data. It can be Task[] or Record<string, Task[]>
  let days: { dateStr: string; tasks: Task[] }[] = [];
  
  if (Array.isArray(data)) {
      // Group by due_date
      const grouped = data.reduce((acc, task) => {
          const d = task.due_date || 'Unknown';
          if (!acc[d]) acc[d] = [];
          acc[d].push(task);
          return acc;
      }, {} as Record<string, Task[]>);
      
      days = Object.keys(grouped).sort().map(k => ({ dateStr: k, tasks: grouped[k] }));
  } else if (data && typeof data === 'object') {
      days = Object.keys(data).sort().map(k => ({ dateStr: k, tasks: (data as any)[k] }));
  }

  if (days.length === 0) {
    return <EmptyState message="No tasks this week." />;
  }

  return (
    <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
      {days.map(day => (
        <View key={day.dateStr} style={styles.dayGroup}>
          <Text style={[theme.typography.heading2, { color: theme.colors.textPrimary, marginBottom: 8 }]}>
            {day.dateStr}
          </Text>
          {day.tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

export default function PlannerScreen() {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrev = () => {
    setSelectedDate(prev => addDays(prev, viewMode === 'daily' ? -1 : -7));
  };

  const handleNext = () => {
    setSelectedDate(prev => addDays(prev, viewMode === 'daily' ? 1 : 7));
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[theme.typography.heading1, { color: theme.colors.textPrimary }]}>Planner</Text>
        <View style={[styles.toggleContainer, { backgroundColor: theme.colors.surfaceMuted, borderRadius: theme.radii.button }]}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'daily' && { backgroundColor: theme.colors.primary, borderRadius: theme.radii.button }]}
            onPress={() => setViewMode('daily')}
          >
            <Text style={[theme.typography.subtitle, { color: viewMode === 'daily' ? theme.colors.onPrimary : theme.colors.textSecondary }]}>Daily</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'weekly' && { backgroundColor: theme.colors.primary, borderRadius: theme.radii.button }]}
            onPress={() => setViewMode('weekly')}
          >
            <Text style={[theme.typography.subtitle, { color: viewMode === 'weekly' ? theme.colors.onPrimary : theme.colors.textSecondary }]}>Weekly</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.dateNav}>
        <TouchableOpacity onPress={handlePrev} style={styles.navButton}>
          <IconSymbol name="chevron.left" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToday}>
          <Text style={[theme.typography.bodyBold, { color: theme.colors.primary }]}>
            {viewMode === 'daily' ? formatDisplayDate(selectedDate) : `Week of ${formatDisplayDate(getStartOfWeek(selectedDate))}`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.navButton}>
          <IconSymbol name="chevron.right" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {viewMode === 'daily' ? (
          <DailyView date={selectedDate} />
        ) : (
          <WeeklyView startDate={getStartOfWeek(selectedDate)} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginTop: 16,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  dateNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  navButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  listContent: {
    padding: 24,
    paddingTop: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  taskCard: {
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  taskFooter: {
    flexDirection: 'row',
    marginTop: 12,
  },
  dayGroup: {
    marginBottom: 24,
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
  }
});
