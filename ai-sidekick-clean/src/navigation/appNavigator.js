import React from "react";
import {NavigationContainer} from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">{/*here adds screens*/}</Stack.Navigator>
        </NavigationContainer>
    )
}