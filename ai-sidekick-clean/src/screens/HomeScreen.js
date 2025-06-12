import React from "react";
import { View, text, Button, StyleSheet } from "react-native";

import * as SecureStore from "expo-secure-store"
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

import { navigateTo } from "../utils/navigationHalper";

export default function HomeScreen({ navigation }) {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await SecureStore.deleteItemAsync('token');
        dispatch(logout());
        navigateTo(navigation, "Login", {}, true);
    };

    return (
        <View style={styles.container}>
            <Text stayle={styles.title}>ברוכים הבאים</Text>
            <Button title="התנתק" onPress={handleLogout} />
        </View>
    )
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
});