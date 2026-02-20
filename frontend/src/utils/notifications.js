import * as Notifications from "expo-notifications";

export const requestPermission = async () => {
    await Notifications.requestPermissionsAsync();
};

export const sendLocalNotification = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
        content: { title, body },
        trigger: null,
    });
};
