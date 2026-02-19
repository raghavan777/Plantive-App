import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveOfflineSubmission = async (data) => {
    const existing = await AsyncStorage.getItem("offline_submissions");
    const list = existing ? JSON.parse(existing) : [];
    list.push(data);
    await AsyncStorage.setItem("offline_submissions", JSON.stringify(list));
};

export const getOfflineSubmissions = async () => {
    const data = await AsyncStorage.getItem("offline_submissions");
    return data ? JSON.parse(data) : [];
};

export const clearOffline = async () => {
    await AsyncStorage.removeItem("offline_submissions");
};
