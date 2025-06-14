import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useSelector } from "react-redux";
import { selectTasksForDay } from "../features/tasks/tasksSlice";

const daysOfWeek = [
  { key: "sun", label: "א'", date: "16/6" },
  { key: "mon", label: "ב'", date: "17/6" },
  { key: "tue", label: "ג'", date: "18/6" },
  { key: "wed", label: "ד'", date: "19/6" },
  { key: "thu", label: "ה'", date: "20/6" },
  { key: "fri", label: "ו'", date: "21/6" },
  { key: "sat", label: "ש'", date: "22/6" },
];

export default function HomeScreen() {
  const [selectedDay, setSelectedDay] = useState(null);

  const tasks = useSelector(selectTasksForDay(selectTasksForDay));

  return (
    <View style={styles.container}>
      {/* כרטיסיות ימי השבוע */}
      <FlatList
        data={daysOfWeek}
        horizontal
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.weekList}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dayCard,
              item.key === selectedDay && styles.selectedCard,
            ]}
            onPress={() => setSelectedDay(item.key)}
          >
            <Text style={styles.dayText}>{item.label}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </TouchableOpacity>
        )}
      />

      {/* משימות לפי שעה */}
      <ScrollView style={styles.taskList}>
        {tasks.length === 0 ? (
          <Text style={styles.noTasksText}>אין משימות ליום זה</Text>
        ) : (
          tasks.map((task, idx) => (
            <View key={idx} style={styles.taskItem}>
              <Text style={styles.taskTime}>{task.time}</Text>
              <Text style={styles.taskTitle}>{task.title}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 50 },
  weekList: { paddingHorizontal: 10 },
  dayCard: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: "center",
  },
  selectedCard: {
    backgroundColor: "#007AFF",
  },
  dayText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  dateText: {
    fontSize: 14,
    color: "#555",
  },
  taskList: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  taskItem: {
    flexDirection: "row",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#eef",
    borderRadius: 10,
  },
  taskTime: {
    fontWeight: "bold",
    width: 60,
  },
  taskTitle: {
    flex: 1,
  },
  noTasksText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#999",
  },
});
