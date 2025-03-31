import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function TaskScreen() {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Buy milk", done: false },
    { id: "2", title: "Call Mom", done: false },
    { id: "3", title: "Make coffee", done: false },
  ]);

  const toggleTaskDone = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <View style={StyleSheet.container}>
      <Text style={StyleSheet.title}>📋 Today's Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTaskDone(item.id)}>
            <Text style={[StyleSheet.task, item.done && StyleSheet.done]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  task: {
    fontSize: 18,
    padding: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  done: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
