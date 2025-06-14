import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import tasksReducer from "../features/tasks/tasksSlice";

import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { EncryptedPersistStorage } from "../utils/encryptedStorage";

import { combineReducers } from "@reduxjs/toolkit";

// configs
const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
};

const tasksPersistConfig = {
  key: "tasks",
  storage: AsyncStorage,
};

// reducers
const rootReducer = combineReducers({
  auth: authReducer,
  tasks: persistReducer(tasksPersistConfig, tasksReducer),
});

// store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
