import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Alert } from "react-native";

export const setupNotificationHandler = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
};

export const registerForPushNotificationsAsync = async () => {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
        Alert.alert("Notification permission not granted!");
    }
  } else {
    Alert.alert("This nust be run on a physical device");

  }
};

export const scheduleMorningReminder = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🤖 Sidekick",
      body: "Good morning please do not forget about to make a coffe",
    },
    trigger: {
      hour: 7,
      minute: 30,
      repeats: true,
    },
  });
};
