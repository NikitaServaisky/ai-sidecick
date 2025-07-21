import { createSlice, nanoid, createSelector } from "@reduxjs/toolkit";

import { STORAGE_KEYS } from "../../constans/constans";

const initialState = {
  taskLists: [],
};

const tasksSlice = createSlice({
  name: STORAGE_KEYS.TASKS,
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        const { date, task } = action.payload;
        console.log("addTask action payload:", action.payload)
        const day = state.taskLists.find((d) => String(d.dayKey) === String(date));

        if (day) {
          day.tasks.push(task);
        } else {
          state.taskLists.push({ dayKey: String(date), tasks: [task] });
        }
          console.log("Updated taskLists:", state.taskLists);
      },
      prepare(
        date,
        title,
        time = "",
        type,
        phone = "",
        email = "",
        notes = "",
        attachment = null,
        imageUri = null
      ) {
        return {
          payload: {
            date,
            task: {
              id: nanoid(),
              title,
              time,
              type,
              phone,
              email,
              notes,
              attachment,
              imageUri,
              isDone: false,
            },
          },
        };
      },
    },
    toggleTaskDone(state, action) {
      const { date, taskId } = action.payload;
      const day = state.taskLists.find((d) => d.dayKey === date);
      if (day) {
        const task = day.tasks.find((t) => t.id === taskId);
        if (task) task.isDone = !task.isDone;
      }
    },
    deleteTask(state, action) {
      const { date, taskId } = action.payload;
      console.log("🔍 trying to delete from date:", date);
      const day = state.taskLists.find((d) => d.dayKey === date);
      console.log("📆 found day:", day);
      if (day) {
        console.log("❌ before delete", day.tasks.length);
        day.tasks = day.tasks.filter((t) => t.id !== taskId);
        console.log("✅ after delete", day.tasks.length);
      }
    },
  },
});

export const selectTasksForDay = (dayKey) =>
  createSelector(
    (state) => state.tasks.taskLists,
    (taskLists) => {
      console.log("🔍 מחפש תאריך:", dayKey);
      const found = taskLists.find((d) => d.dayKey === dayKey);
      console.log("📦 נמצא?:", !!found, found);
      return found ? found.tasks : [];
    }
  );


export const { addTask, toggleTaskDone, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
