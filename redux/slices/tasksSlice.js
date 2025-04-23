import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  taskLists: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTaskList: {
      reducer(state, action) {
        state.taskLists.push(action.payload);
      },
      prepare(title) {
        return {
          payload: {
            id: nanoid(),
            title,
            tasks: [],
          },
        };
      },
    },
    removeTaskList(state, action) {
      state.taskLists = state.taskLists.filter(list => list.id !== action.payload);
    },
    addTaskToList: {
      reducer(state, action) {
        const { listId, task } = action.payload;
        const list = state.taskLists.find(l => l.id === listId);
        if (list) {
          list.tasks.push(task);
        }
      },
      prepare(listId, title) {
        return {
          payload: {
            listId,
            task: {
              id: nanoid(),
              title,
              done: false,
            },
          },
        };
      },
    },
    toggleTaskDone(state, action) {
      const { listId, taskId } = action.payload;
      const list = state.taskLists.find(l => l.id === listId);
      if (list) {
        const task = list.tasks.find(t => t.id === taskId);
        if (task) task.done = !task.done;
      }
    },
    removeTaskFromList(state, action) {
      const { listId, taskId } = action.payload;
      const list = state.taskLists.find(l => l.id === listId);
      if (list) {
        list.tasks = list.tasks.filter(t => t.id !== taskId);
      }
    },
  },
});

export const {
  addTaskList,
  removeTaskList,
  addTaskToList,
  toggleTaskDone,
  removeTaskFromList,
} = tasksSlice.actions;

export default tasksSlice.reducer;
