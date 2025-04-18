import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppScreen from "../screens/App";
import CalendarScreen from "../screens/CalendarScreen";
import HeaderDropdown from "../components/headerComponent/HeaderDropdown";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={AppScreen}
          options={{
            header: ({ navigation }) => (
              <HeaderDropdown navigation={navigation} />
            ),
          }}
        />
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            header: ({ navigation }) => (
              <HeaderDropdown navigation={navigation} />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
