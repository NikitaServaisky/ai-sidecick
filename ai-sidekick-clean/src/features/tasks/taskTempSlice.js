import { createSlice } from "@reduxjs/toolkit";

import { STORAGE_KEYS } from "../../constans/constans";

const initialState = {
    image: null,
    attachment: null,
};

const taskTempSlice = createSlice({
    name: STORAGE_KEYS.TASK_TEMP,
    initialState,
    reducers: {
        setTempImage: (state, action) => {
            state.image = action.payload;
        },
        setTempAttachment: (state, action) => {
            state.attachment = action.payload;
        },
        clearTempTaskData: (state) => {
            state.image = null;
            state.attachment = null;
        },
    },
});

export const { setTempImage, setTempAttachment, clearTempTaskData } = taskTempSlice.actions;

export default taskTempSlice.reducer;