import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";

export default function TravelTodoScreen() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState([
    { id: "1", title: "Book a hotel", done: false },
    { id: "2", title: "Prepare clothes", done: false },
    { id: "3", title: "Buy snacks", done: false },
  ]);

  function addTask() {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now().toString(),
      title: task,
      done: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel Planner ✈️</Text>
      <Text style={styles.subtitle}>Plan your next adventure!</Text>

      <Text style={styles.heading}>My Travel Tasks</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a travel task..."
          value={task}
          onChangeText={setTask}
        />

        <Pressable style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Pressable
              style={styles.taskContent}
              onPress={() => toggleTask(item.id)}
            >
              <Text style={styles.checkbox}>
                {item.done ? "☑" : "☐"}
              </Text>

              <Text
                style={[
                  styles.taskText,
                  item.done && styles.completedTask,
                ]}
              >
                {item.title}
              </Text>
            </Pressable>

            <Pressable onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButton}>✕</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks yet. Add your travel plans!
          </Text>
        }
      />

      <Text style={styles.footer}>
        Completed: {tasks.filter((item) => item.done).length} / {tasks.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9F2E7",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#315B3B",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#68866D",
    marginBottom: 25,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#315B3B",
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: "#477B53",
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  taskContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkbox: {
    fontSize: 22,
    marginRight: 10,
    color: "#477B53",
  },
  taskText: {
    fontSize: 16,
    color: "#315B3B",
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#999999",
  },
  deleteButton: {
    color: "#D65B50",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  emptyText: {
    textAlign: "center",
    color: "#68866D",
    marginTop: 30,
  },
  footer: {
    textAlign: "center",
    color: "#477B53",
    fontWeight: "bold",
    padding: 15,
  },
});