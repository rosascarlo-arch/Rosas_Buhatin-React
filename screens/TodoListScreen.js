
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  useColorScheme,
} from "react-native";

// PROGRESS CARD
function ProgressCard({ completed, total, theme }) {
  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <View style={[styles.progressCard, { backgroundColor: theme.card }]}>
      <View style={styles.progressHeader}>
        <View>
          <Text style={[styles.cardLabel, { color: theme.muted }]}>
            YOUR PROGRESS
          </Text>

          <Text style={[styles.progressNumber, { color: theme.text }]}>
            {completed}/{total} Tasks Completed
          </Text>
        </View>

        <Text style={styles.progressEmoji}>
          {percentage === 100 && total > 0 ? "🎉" : "📖"}
        </Text>
      </View>

      <View
        style={[
          styles.progressTrack,
          { backgroundColor: theme.progressBg },
        ]}
      >
        <View
          style={[
            styles.progressFill,
            {
              width: `${percentage}%`,
              backgroundColor: theme.accent,
            },
          ]}
        />
      </View>

      <Text style={[styles.progressHint, { color: theme.muted }]}>
        {percentage === 100 && total > 0
          ? "Great job! All tasks completed!"
          : "Keep going! Every small step counts."}
      </Text>
    </View>
  );
}

// ADD TASK FORM
function AddTaskForm({ onAddTask, theme }) {
  const [taskTitle, setTaskTitle] = useState("");

  const handleAddTask = () => {
    const trimmedTitle = taskTitle.trim();

    if (trimmedTitle.length === 0) {
      return;
    }

    onAddTask(trimmedTitle);
    setTaskTitle("");
  };

  return (
    <View style={styles.addTaskContainer}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Add a Task
      </Text>

      <View style={styles.addTaskRow}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.inputBg,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
          placeholder="What do you need to study?"
          placeholderTextColor={theme.muted}
          value={taskTitle}
          onChangeText={setTaskTitle}
          onSubmitEditing={handleAddTask}
          returnKeyType="done"
        />

        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.accent }]}
          onPress={handleAddTask}
          activeOpacity={0.8}
        >
          <Text style={[styles.addButtonText, { color: theme.accentText }]}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// TASK ITEM
function TaskItem({ task, onToggle, onDelete, theme }) {
  return (
    <View
      style={[
        styles.taskItem,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.checkbox,
          {
            borderColor: task.completed ? theme.accent : theme.muted,
            backgroundColor: task.completed ? theme.accent : "transparent",
          },
        ]}
        onPress={() => onToggle(task.id)}
        activeOpacity={0.7}
      >
        {task.completed && (
          <Text style={[styles.checkmark, { color: theme.accentText }]}>
            ✓
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.taskTextContainer}
        onPress={() => onToggle(task.id)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.taskTitle,
            {
              color: task.completed ? theme.muted : theme.text,
              textDecorationLine: task.completed ? "line-through" : "none",
            },
          ]}
        >
          {task.title}
        </Text>

        <Text style={[styles.taskStatus, { color: theme.muted }]}>
          {task.completed ? "Completed" : "Not completed"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(task.id)}
        activeOpacity={0.7}
      >
        <Text style={[styles.deleteText, { color: theme.deleteText }]}>
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// MAIN TODO LIST SCREEN
export default function TodoListScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme = {
    background: isDark ? "#111318" : "#F5F7FC",
    card: isDark ? "#20232B" : "#FFFFFF",
    text: isDark ? "#F4F5F7" : "#202536",
    muted: isDark ? "#A5ADBD" : "#737B8C",
    border: isDark ? "#353A46" : "#E0E5EF",
    accent: isDark ? "#B8C7FF" : "#5269C9",
    accentText: isDark ? "#171B27" : "#FFFFFF",
    progressBg: isDark ? "#393E4B" : "#E5E9F5",
    inputBg: isDark ? "#20232B" : "#FFFFFF",
    deleteText: isDark ? "#FF8A8A" : "#D64545",
  };

  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Review Constructor Overloading",
      completed: false,
    },
    {
      id: "2",
      title: "Study Static vs Non-static",
      completed: false,
    },
    {
      id: "3",
      title: "Practice Getters and Setters",
      completed: false,
    },
    {
      id: "4",
      title: "Review If-Else Statements",
      completed: false,
    },
    {
      id: "5",
      title: "Take a Practice Quiz",
      completed: false,
    },
  ]);

  // ADD TASK
  const addTask = (title) => {
    const newTask = {
      id: Date.now().toString(),
      title: title,
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
  };

  // CHECK OR UNCHECK TASK
  const toggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // DELETE TASK
  const deleteTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  };

  // COUNT COMPLETED TASKS
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.topHeader}>
          <View
            style={[
              styles.bookIcon,
              { backgroundColor: theme.accent },
            ]}
          >
            <Text style={styles.bookEmoji}>📚</Text>
          </View>

          <View style={styles.headerTextContainer}>
            <Text style={[styles.headerEyebrow, { color: theme.muted }]}>
              MY STUDY SPACE
            </Text>

            <Text style={[styles.headerTitle, { color: theme.text }]}>
              Study Planner
            </Text>

            <Text style={[styles.headerSubtitle, { color: theme.muted }]}>
              Learn a Advance Programming. To Achieve a lot.
            </Text>
          </View>
        </View>

        {/* PROGRESS */}
        <ProgressCard
          completed={completedCount}
          total={tasks.length}
          theme={theme}
        />

        {/* ADD TASK */}
        <AddTaskForm onAddTask={addTask} theme={theme} />

        {/* TASK LIST */}
        <View style={styles.taskListHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            My Tasks
          </Text>

          <Text style={[styles.taskCount, { color: theme.muted }]}>
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </Text>
        </View>

        {tasks.length === 0 ? (
          <View
            style={[
              styles.emptyState,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={styles.emptyEmoji}>📝</Text>

            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              No tasks yet
            </Text>

            <Text style={[styles.emptySubtitle, { color: theme.muted }]}>
              Add a task above to get started.
            </Text>
          </View>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              theme={theme}
            />
          ))
        )}

        {/* FOOTER */}
        <Text style={[styles.footer, { color: theme.muted }]}>
          ✨ Small steps. Better results.
        </Text>
      </ScrollView>
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },
  bookIcon: {
    width: 62,
    height: 62,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  bookEmoji: {
    fontSize: 30,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerEyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "800",
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  progressCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  progressNumber: {
    fontSize: 17,
    fontWeight: "700",
  },
  progressEmoji: {
    fontSize: 30,
  },
  progressTrack: {
    height: 9,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 10,
  },
  progressHint: {
    fontSize: 12,
    marginTop: 12,
  },
  addTaskContainer: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
  },
  addTaskRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 15,
    fontSize: 14,
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 34,
  },
  taskListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  taskCount: {
    fontSize: 13,
    fontWeight: "600",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkmark: {
    fontSize: 15,
    fontWeight: "800",
  },
  taskTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  taskStatus: {
    fontSize: 11,
    marginTop: 4,
  },
  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  deleteText: {
    fontSize: 12,
    fontWeight: "700",
  },
  emptyState: {
    alignItems: "center",
    padding: 28,
    borderRadius: 16,
    borderWidth: 1,
  },
  emptyEmoji: {
    fontSize: 32,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: "center",
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 25,
    marginBottom: 10,
  },
});
