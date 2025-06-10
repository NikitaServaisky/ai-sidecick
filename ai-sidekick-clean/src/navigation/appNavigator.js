import React from "react";
import {NavigationContainer} from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator({isAuthenticated}) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isAuthenticated ? "Home" : "Login"}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Registration" component={RegisterScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}