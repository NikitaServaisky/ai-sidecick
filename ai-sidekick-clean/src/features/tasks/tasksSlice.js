import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    taskLists: [],
};

const tasksSlice = createSlice({
    name: 'tasks',
    reducers: {
        addTask: {
            reducer(state, action) {
                const { date, task } = action.payload;
                const day = state.taskLists.find((d) => d.title === date)

                if(day) {
                    day.tasks.push(task);
                } else {
                    state.taskLists.push({ title: date, tasks: [task] });
                }
            },
            prepare(date, text, time = "") {
                return {
                    payload: {
                        date,
                        task: {
                        id: nanoid(),
                        text,
                        isDone: false,
                        },
                    },
                };
            },
        },
        toggleTaskDone(state, action) {
            const { date, taskId } = action.payload;
            const day = state.taskLists.find((d) => d.title === date);
            if(day) {
                const task = day.tasks.find((t) => t.id === taskId);
                if (task) task.isDone = !task.isDone;
            }
        },
        deleteTask(state, action) {
            const { date, taskId } = action.payload;
            const day = state.taskLists.find((d) => d.title === date);
            if(day) {
                day.tasks = day.tasks.filter((t) => t.is !== taskId);
            }
        },
    },
});

export const { addTask, toggleTaskDone, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;