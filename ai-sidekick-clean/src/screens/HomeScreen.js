import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";
import { selectTasksForDay } from "../features/tasks/tasksSlice";
import { getCurrentWeekDates } from "../utils/dateUtils";

import TaskModal from "../components/TaskModal";
import WeekCarusel from "../components/WeekCarusel";
import DailyTasksList from "../components/DailyTasksList";
import { navigateTo } from "../utils/navigationHalper";

export default function HomeScreen() {
  const weekDays = getCurrentWeekDates();
  const todayKey = weekDays.find((day) => day.isToday)?.key || weekDays[0].key;
  const [selectedDay, setSelectedDay] = useState(todayKey);
  const navigation = useNavigation();

  const selectedDate = weekDays.find((d) => d.key === selectedDay)?.fullDate;
  const tasks = useSelector(selectTasksForDay(selectedDate));

  const [tasksModal, setTasksModal] = useState(false);
  const [modalDay, setModalDay] = useState(null);

  const handleDayPress = (item) => {
    setSelectedDay(item.key);
    setModalDay(item);
    setTasksModal(true);
  };

  return (
    <View style={styles.container}>
      {/* week cards carusel */}
      <WeekCarusel
        weekDays={weekDays}
        selectedDay={selectedDay}
        onDayPress={handleDayPress}
      />

      <TaskModal
        visible={tasksModal}
        animationType="slide"
        transparent={true}
        modalDay={modalDay}
        onClose={() => setTasksModal(false)}
      ></TaskModal>

      {/* tasks by hours */}
      <DailyTasksList tasks={tasks} />

      <Pressable style={styles.addButton}>
        <Text
          style={styles.addButtonText}
          onPress={() => navigateTo(navigation, "Add-task")}
        >
          +
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 50 },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    left: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 32,
  },
});
