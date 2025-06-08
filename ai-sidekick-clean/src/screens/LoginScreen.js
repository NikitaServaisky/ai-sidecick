import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, } from "react-native";

import { navigateTo } from "../utils/navigationHalper";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // now only print
        console.log('Trying to login with:', email, password);
        navigateTo(navigation, 'Home', {}, true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}></Text>
            <TextInput placeholder="אימייל" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none"/>
            <TextInput placeholder="סיסמה" value={password} onChangeText={setPassword} secureTextEntry style={styles.input}/>
            <Button title="התחבר" onPress={handleLogin}/>
            <Button title="הירשם" onPress={() => navigateTo(navigation, 'Register')}/>
        </View>
    );
}

const styles =  StyleSheet.create({
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
