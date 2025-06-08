import axios from "axios";
import * as SecureStore from "expo-secure-store";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return SecureStore.getItemAsync("token").then((token) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("🚀 Token attached to request:", token); // אופציונלי
      }
      return config;
    });
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
