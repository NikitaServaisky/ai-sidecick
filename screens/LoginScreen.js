import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError("כל השדות נדרשים");
        return;
      }

      const response = await fakeLogin(email, password);

      if (!response.success) {
        setError("אימייל או סיסמה שגויים");
        return;
      }

      const token = "dummy-token";
      const user = { email };

      dispatch(loginSuccess({ user, token }));
      navigation.replace("Home");
    } catch (err) {
      setError("אירעה שגיאה. נסה שוב מאוחר יותר.");
    }
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
    </View>
  );
}

// Simulated login - replace with real API call later
const fakeLogin = async (email, password) => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          success: email === "test@test.com" && password === "1234",
        }),
      500
    )
  );
};

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
