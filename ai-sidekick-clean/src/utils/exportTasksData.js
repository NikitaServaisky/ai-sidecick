/**
 * הפונקציה מושכת את כל היומן מרידקס ממירה את המידע לJSON ומעבירה את היומן לתיקיה עם כל הקבצים.
 *
 * the function fetch all task diary from redux convert to JSON and adds to all files.
 */

import * as FileSystem from "expo-file-system";
import { store } from "../redux/store";

export const exportTasksData = async () => {
  try {
    const state = store.getState();
    const tasksData = state.tasks.taskLists;

    const path =
      FileSystem.documentDirectory + "exported_tasks/tasks_data.json";
    await FileSystem.writeAsStringAsync(
      path,
      JSON.stringify(tasksData, null, 2)
    );

    return path;
  } catch (err) {
    console.log("שגיאה ב־exportTasksData:", err);
    throw err;
  }
};
