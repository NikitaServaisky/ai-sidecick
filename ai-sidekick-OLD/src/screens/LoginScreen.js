import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import axiosInstance from "../axios/axiosInstance";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/login", { email, password });
      const token = response.data.token;
      const user = response.data.user;

      await SecureStore.setItemAsync("token", token);

      dispatch(loginSuccess({ user, token }));
      
    } catch (error) {
      setError("התחברות נכשלה. בדוק את הפרטים ונסה שוב.");
    }
  };

  const redirectToSingUp = () => {
    navigation.replace("Registration");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>התחברות</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
      <Button title="התחבר" onPress={handleLogin} />
      <Button title="הירשם" onPress={redirectToSingUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 30,
  },
  error: {
    color: "red",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
});
