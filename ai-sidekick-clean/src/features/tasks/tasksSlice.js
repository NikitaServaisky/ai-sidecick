import { createSlice, nanoid, createSelector } from "@reduxjs/toolkit";

const initialState = {
  taskLists: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        const { date, task } = action.payload;
        const day = state.taskLists.find((d) => d.dayKey === date);

        if (day) {
          day.tasks.push(task);
        } else {
          state.taskLists.push({ dayKey: date, tasks: [task] });
        }
      },
prepare(date, title, time = "", type, phone = "", email = "", notes = "", attachment = null, imageUri = null) {
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
}

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
      const day = state.taskLists.find((d) => d.dayKey === date);
      if (day) {
        day.tasks = day.tasks.filter((t) => t.id !== taskId);
      }
    },
  },
});

export const selectTasksForDay = (dayKey) =>
  createSelector(
    (state) => state.tasks.taskLists,
    (taskLists) => {
      const day = taskLists.find((d) => d.dayKey === dayKey);
      return day ? day.tasks : [];
    }
  );

export const { addTask, toggleTaskDone, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
