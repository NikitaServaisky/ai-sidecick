import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authReducer from "../features/auth/authSlice";
import tasksReducer from "../features/tasks/tasksSlice";
import taskTempReducer from "../features/tasks/taskTempSlice"; // חדש

import { STORAGE_KEYS } from "../constans/constans";

// configs
const authPersistConfig = {
  key: STORAGE_KEYS.AUTH,
  storage: AsyncStorage,
};

const tasksPersistConfig = {
  key: STORAGE_KEYS.AUTH,
  storage: AsyncStorage,
};

// reducers
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  tasks: persistReducer(tasksPersistConfig, tasksReducer),
  taskTemp: taskTempReducer, // not saves
});

// store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
