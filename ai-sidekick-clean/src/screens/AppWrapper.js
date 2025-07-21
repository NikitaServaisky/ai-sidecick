import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useSelector, useDispatch } from "react-redux";

import { STORAGE_KEYS } from "../constans/constans";

import AppNavigator from "../navigation/appNavigator";
import { loginSuccess } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

export default function AppWrapper() {
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  //logs
  console.log("Redux token:", token);

  useEffect(() => {
    const fallbackLoadFromSecureStore = async () => {
      // trying to restore token from redux if miss token
      if (!token) {
        const storedToken = await SecureStore.getItemAsync(STORAGE_KEYS.AUTH, token);
        const storedUser = await SecureStore.getItemAsync("user");

        if (storedToken && storedUser) {
          try {
            const decoded = jwtDecode(storedToken);
            const isValid = decoded.exp * 1000 > Date.now();
            console.log("Token exp:", decoded.exp * 1000, "Now:", Date.now());
            if (isValid) {
              dispatch(
                loginSuccess({
                  token: storedToken,
                  user: JSON.parse(storedUser),
                })
              );
            }
          } catch (err) {
            console.warn("Token decode failed of expired");
          }
        }
      }
      setLoading(false);
    };

    fallbackLoadFromSecureStore();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  const isAuthenticated = !!token;
  return <AppNavigator isAuthenticated={isAuthenticated} />;
}
