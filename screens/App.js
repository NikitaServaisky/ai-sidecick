import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  // ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { getWeekDays } from "../services/CalendarUtils";
import { getInitialTasks } from "../services/taskManager";
import WeekView from "../components/weekViewComponent/WeekView";
import TaskList from "../components/taskListComponent/TaskList";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../styles/globalStyles";

export default function App() {
  const navigation = useNavigation();
  const week = getWeekDays();
  const [selectedDate, setSelectedDate] = useState(week[0].formatted);
  const [tasksByDate, setTasksByDate] = useState(getInitialTasks(week));

  const toggleTaskDone = (id) => {
    setTasksByDate((prev) => {
      const updatedTasks = prev[selectedDate].map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      );
      return { ...prev, [selectedDate]: updatedTasks };
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={globalStyles.container}>
          <Text style={globalStyles.title}>📅 Select a Day</Text>

          <WeekView
            week={week}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <Text style={styles.subTitle}>📝 Tasks for {selectedDate}</Text>

          <TaskList
            tasks={tasksByDate[selectedDate] || []}
            toggleTaskDone={toggleTaskDone}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    flexGrow: 1,
  },
  subTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
});
