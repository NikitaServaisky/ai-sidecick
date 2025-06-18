import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";

import { useSelector } from "react-redux";
import { selectTasksForDay } from "../features/tasks/tasksSlice";
import { getCurrentWeekDates } from "../utils/dateUtils";

import TaskModal from "../components/TaskModal";
import WeekCarusel from "../components/WeekCarusel";
import DailyTasksList from "../components/DailyTasksList";

export default function HomeScreen() {
  const weekDays = getCurrentWeekDates();
  const todayKey = weekDays.find((day) => day.isToday)?.key || weekDays[0].key;
  const [selectedDay, setSelectedDay] = useState(todayKey);

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
      {/* כרטיסיות ימי השבוע */}
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

      {/* משימות לפי שעה */}
      <DailyTasksList tasks={tasks} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 50 },
});
