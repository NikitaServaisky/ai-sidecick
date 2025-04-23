import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "../redux/store";
import WeekView from "../components/weekViewComponent/WeekView";
import TaskList from "../components/taskListComponent/TaskList";
import { getWeekDays } from "../services/CalendarUtils";
import globalStyles from "../styles/globalStyles";
import {
  toggleTaskDone,
} from "../features/tasks/tasksSlice";

function MainApp() {
  const dispatch = useDispatch();
  const week = getWeekDays();
  const [selectedDate, setSelectedDate] = useState(week[0].formatted);

  // לצורך הדוגמה – נשלוף את כל המשימות מהסטייט הגלובלי
  const taskLists = useSelector((state) => state.tasks.taskLists);

  // ננסה למצוא משימות שתואמות לתאריך הנבחר (בהמשך תוכל לסדר לפי listId)
  const tasksForDay = taskLists.find(
    (list) => list.title === selectedDate // תתאים את זה למבנה שלך
  )?.tasks || [];

  const handleToggleTask = (taskId) => {
    // בגרסה אמיתית תשלוף גם listId לפי הסדר שלך
    dispatch(toggleTaskDone({ listId: "todo", taskId }));
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

          <TaskList tasks={tasksForDay} toggleTaskDone={handleToggleTask} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
});
