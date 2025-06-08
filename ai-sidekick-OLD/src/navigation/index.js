import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

// Screens
import AppScreen from "../screens/App";
import CalendarScreen from "../screens/CalendarScreen";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegisterScreen";

// Header
import HeaderDropdown from "../components/headerComponent/HeaderDropdown";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={AppScreen}
              options={({ navigation }) => ({
                headerShown: true,
                headerTitle: () => <HeaderDropdown navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="Calendar"
              component={CalendarScreen}
              options={({ navigation }) => ({
                headerShown: true,
                headerTitle: () => <HeaderDropdown navigation={navigation} />,
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
