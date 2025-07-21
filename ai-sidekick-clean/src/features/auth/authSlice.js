import { createSlice } from "@reduxjs/toolkit";

import { STORAGE_KEYS } from "../../constans/constans";

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: STORAGE_KEYS.AUTH,
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
