import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import * as SecureStore from "expo-secure-store";

import AppNavigator from "../navigation/appNavigator";

export default function AppWrapper() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthticted, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
          dispatch(loginSuccess({ user: null, token }));
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("בעיה בבדיקת התוקן:", err);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  if (isLoading) return null;

  return <AppNavigator isAuthticted={isAuthticted} />
}
