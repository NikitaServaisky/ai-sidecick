import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../redux/store";
import * as SecureStore from "expo-secure-store";

import WeekView from "../components/weekViewComponent/WeekView";
import TaskList from "../components/taskListComponent/TaskList";
import { getWeekDays } from "../services/CalendarUtils";
import globalStyles from "../styles/globalStyles";
import { toggleTaskDone } from "../features/tasks/tasksSlice";
import { loginSuccess } from "../redux/slices/authSlice";
import LoginScreen from "./LoginScreen"; // ודא שהנתיב נכון לפי מיקומך

function MainApp() {
  const dispatch = useDispatch();
  const week = getWeekDays();
  const [selectedDate, setSelectedDate] = useState(week[0].formatted);

  const taskLists = useSelector((state) => state.tasks.taskLists);

  const tasksForDay =
    taskLists.find((list) => list.title === selectedDate)?.tasks || [];

  const handleToggleTask = (taskId) => {
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

function AppWrapper() {
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const token = useSelector((state) => state.auth.token); // 👈 מפה נדע אם מחובר

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
          dispatch(loginSuccess({ token }));
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkLogin();
  }, []);

  if (checkingAuth) return null;

  return token ? <MainApp /> : <LoginScreen />;
}

export default function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
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
