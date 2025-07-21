import React from "react";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Pressable, View, Text, StyleSheet } from "react-native";

import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

import styles from "../styles/CustomDrawerContetsStyle";

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