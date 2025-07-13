import React from "react";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Pressable, View, Text, StyleSheet } from "react-native";

import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";


export default function CustomDrawerContent(props) {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />

            <View style={styles.footer}>
                <Pressable style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>התנתק</Text>
                </Pressable>
            </View>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 10,
  },
  logoutButton: {
    paddingVertical: 10,
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
});