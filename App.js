import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { AuthProvider } from "./src/context/AuthContext";
import { LanguageProvider } from "./src/context/LanguageContext";
import AppNavigator from "./src/navigation/AppNavigator";

import NetInfo from "@react-native-community/netinfo";
import API from "./src/services/api";
import { clearOffline, getOfflineSubmissions } from "./src/utils/offlineStorage";

export default function App() {

  // 🌐 Auto Sync Offline Data When Internet Returns
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      if (state.isConnected) {
        try {
          const offlineData = await getOfflineSubmissions();

          if (offlineData.length > 0) {
            console.log("Syncing offline submissions...");

            for (let item of offlineData) {
              await API.post("/farmer/submit", item);
            }

            await clearOffline();
            console.log("Offline data synced successfully");
          }
        } catch (error) {
          console.log("Sync failed:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <AuthProvider>
        <LanguageProvider>
          <AppNavigator />
        </LanguageProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
