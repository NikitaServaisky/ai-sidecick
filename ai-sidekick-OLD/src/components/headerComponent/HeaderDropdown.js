import React, { useState } from "react";
import { Text, Modal, TouchableOpacity } from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import styles from "./headerDropdown.styles";
import globalStyles from "../../styles/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import screenTitles from "../../constants/screenTitles";

export default function HeaderDropdown() {
  const [visible, setVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(screenTitles.Home)
  const navigation = useNavigation();
  const route = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      setCurrentScreen(screenTitles[route.name] || "Unnamed Screen")
    }, [route.name])
  )

  const handleNavigate = (screen) => {
    setVisible(false);
    navigation.navigate(screen);
  };

  return (
    <>
      <SafeAreaView style={styles.headerWrapper}>
        <TouchableOpacity
          style={styles.fullArea}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.title}>{currentScreen}</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.menu}
            onPress={(e) => e.stopPropagation?.()}
          >
            <TouchableOpacity onPress={() => handleNavigate("Home")}>
              <Text style={styles.option}>📅 Weekly View</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigate("Calendar")}>
              <Text style={styles.option}>🗓️ Monthly Calendar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
