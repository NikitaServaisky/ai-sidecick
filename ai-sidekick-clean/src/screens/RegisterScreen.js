import React, { useState } from "react";
import { navigateTo } from "../utils/navigationHalper";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import axiosInstance from "../services/axiosInstance";
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('בסיסמאות אינן תואמות');
    }

    try {
      const responce = await axiosInstance.post('/registration', {
        firstName,
        lastName,
        email,
        password
      });
      const {
        token,
        user,
      } = responce.data;

      await SecureStore.setItemAsync('token', token);
      dispatch(loginSuccess({user, token}));
    } catch (err) {
      console.error('אירוע שגיאה בעט הרשמה', err);
      if (err.responce && err.responce.data.message) {
        setError(err.responce.data.message);
      } else {
        setError('שגיאה לא ידוע')
      }
    }

    // בהמשך: שלח לשרת
    console.log("Registering with:", email, password);
    navigateTo(navigation, "Login", {}, true); // נניח חזרה למסך התחברות
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>הרשמה</Text>
      <TextInput
        placeholder="שם פרטי"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="שם משפחה"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        placeholder="אימייל"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="סיסמה"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="אימות סיסמה"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      { error !== '' && <Text style={styles.error}>{error}</Text>}
      <Button title="הירשם" onPress={handleRegister} />
      <Button
        title="כבר רשום? התחבר"
        onPress={() => navigateTo(navigation, "Login")}
      />
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  }
});
