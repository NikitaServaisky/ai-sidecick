import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

export default function DailyTasksList({tasks}) {
    return (
        <ScrollView style={styles.taskList}>
            {tasks.length === 0 ? (
                <Text style={styles.noTasksText}>אין משימות להיום</Text>
            ) : (
                tasks.map((task, idx) => (
                    <View key={idx} style={styles.taskItem}>
                        <Text style={styles.taskTime}>{task.time}</Text>
                        <Text style={styles.taskTitle}>{task.title}</Text>
                    </View>
                ))
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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