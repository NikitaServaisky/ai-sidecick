import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import { navigateTo } from "../utils/navigationHalper";
import axiosInstance from "../services/axiosInstance";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";

import styles from "../styles/LoginScreenStyle";
import { STORAGE_KEYS } from "../constans/constans";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const responce = await axiosInstance.post("/login", { email, password });
      const user = responce.data.user;
      const token = responce.data.token;

      await SecureStore.setItemAsync(STORAGE_KEYS.AUTH, token);
      await SecureStore.setItemAsync("user", JSON.stringify(user))
      dispatch(loginSuccess({ user, token }));

      console.log("Trying to login with:", email, password);
    } catch (err) {
      setError("ההתחברות נכשלה בדוק את הפרטים");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <TextInput
        placeholder="אימייל"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="סיסמה"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error !== "" && <Text style={styles.error}>{error}</Text>}
      <Button title="התחבר" onPress={handleLogin} />
      <Button
        title="הירשם"
        onPress={() => navigateTo(navigation, "Register")}
      />
    </View>
  );
}