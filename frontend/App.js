import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { useEffect, useMemo } from "react";
import { AuthProvider } from "./src/context/AuthContext";
import { LanguageProvider } from "./src/context/LanguageContext";
import AppNavigator from "./src/navigation/AppNavigator";

import NetInfo from "@react-native-community/netinfo";
import API from "./src/services/api";
import { clearOffline, getOfflineSubmissions } from "./src/utils/offlineStorage";

export default function App() {
  const linking = useMemo(
    () => ({
      prefixes: [Linking.createURL("/")],
      config: {
        screens: {
          Auth: {
            path: "auth",
            screens: {
              Language: "language",
              Role: "role",
              FarmerLogin: "farmer/login",
              OfficialLogin: "official/login",
            },
          },
          FarmerApp: {
            path: "farmer",
            screens: {
              Home: "home",
              Capture: "capture",
              Status: "status",
              History: "history",
              Profile: "profile",
              CaptureIndex: "capture/index",
              CaptureStage: "capture/stage",
              CaptureCamera: "capture/camera",
              CapturePreview: "capture/preview",
              Success: "capture/success",
              CaptureGuidance: "capture/guidance",
            },
          },
          OfficerApp: {
            path: "official",
            screens: {
              OfficerHome: "home",
              Assignments: "assignments",
              Reports: "history",
              Profile: "profile",
              FarmDetails: "farm-details",
              VerificationGPS: "verification/gps",
              Verify: "verification/index",
              VerificationCamera: "verification/camera",
              VerificationAssessment: "verification/assessment",
            },
          },
        },
      },
    }),
    []
  );

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
    <NavigationContainer linking={linking}>
      <AuthProvider>
        <LanguageProvider>
          <AppNavigator />
        </LanguageProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
