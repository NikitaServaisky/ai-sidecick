import React, {useEffect} from 'react';
import { View, Text, Button, StyleSheet, Alert, Platform } from 'react-native';
import * as Notifications from "expo-notifications";
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
    scheduleMorningReminder();
  }, []);

  const handleAction = () => {
    Alert.alert("Sidekick אומר:", "אל תשכח לקחת אוכל לילדים 💡");
  };

  const scheduleMorningReminder = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync(); // כדי לא ליצור כפילויות

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🤖 Sidekick",
        body: "הבוקר התחיל! אל תשכח אוכל, מפתחות, חיבוק!",
      },
      trigger: {
        hour: 7,
        minute: 30,
        repeats: true,
      },
    });
  };


  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('לא ניתנה הרשאה להתראות!');
        return;
      }
    } else {
      alert('צריך להריץ את זה על מכשיר אמיתי');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 My AI Sidekick</Text>
      <Button title="תן לי טיפ לבוקר" onPress={handleAction} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
});
