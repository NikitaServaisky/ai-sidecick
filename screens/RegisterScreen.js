import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

export default function RegistrationScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    console.log('Regisrtation:', {name, email, password});
    // this place for registration API
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>הרשמה</Text>

      <TextInput
        style={styles.input}
        placeholder="שם מלא"
        value={name}
        onChangeText={setName}
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

      <Button title="הרשם" onPress={handleRegister} />
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
});
