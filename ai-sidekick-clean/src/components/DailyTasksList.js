import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import styles from "../styles/DailyTasksListStyle";

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