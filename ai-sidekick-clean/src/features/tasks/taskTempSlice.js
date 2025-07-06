import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    image: null,
    attachment: null,
};

const taskTempSlice = createSlice({
    name: 'taskTemp',
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