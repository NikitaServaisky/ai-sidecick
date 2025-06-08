import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

import axiosInstance from "../axios/axiosInstance";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";

export default function RegistrationScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleRegister = async () => {
    // console.log('Regisrtation:', { firstName, lastName, email, password});
    if (password !== confirmPassword) {
      setError('הסיסמאות אינן תואמות');
      return;
    }

    try{
    const response = await axiosInstance.post('/registration', {
      firstName,
      lastName,
      email,
      password
    });

    const { token, user } = response.data;
    dispatch(loginSuccess({token, user}));
    navigation.replace("Home");
    } catch (err) {
      console.error('registration error:', err);
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('unknow error');
      }
    }
  };

  const returnToSingIn = () => {
    navigation.replace('Login')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>הרשמה</Text>

      <TextInput
        style={styles.input}
        placeholder="שם פרטי"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="שם משפחה"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="אימייל"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="סיסמה"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="אימות סיסמה"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {error !== "" && <Text style={styles.error}>{error}</Text>}

      <Button title="הרשמה" onPress={handleRegister} />
      <Button title="מסך התחברות" onPress={returnToSingIn} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 30,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
      },
      error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
      },
});
