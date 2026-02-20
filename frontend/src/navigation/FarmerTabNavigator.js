import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../theme/colors";

// Farmer Screens
import FarmerCameraScreen from "../screens/farmer/FarmerCameraScreen.js";
import FarmerCaptureScreen from "../screens/farmer/FarmerCaptureScreen.js";
import FarmerCaptureStageScreen from "../screens/farmer/FarmerCaptureStageScreen.js";
import FarmerHistoryScreen from "../screens/farmer/FarmerHistoryScreen.js";
import FarmerCaptureGuidanceScreen from "../screens/farmer/FarmerCaptureGuidanceScreen.js";
import FarmerHomeScreen from "../screens/farmer/FarmerHomeScreen.js";
import FarmerPreviewScreen from "../screens/farmer/FarmerPreviewScreen.js";
import FarmerProfileScreen from "../screens/farmer/FarmerProfileScreen.js";
import FarmerCaptureSuccessScreen from "../screens/farmer/FarmerCaptureSuccessScreen.js";
import FarmerStatusScreen from "../screens/farmer/FarmerStatusScreen.js";

const Tab = createBottomTabNavigator();

export default function FarmerTabNavigator() {
    return (
        <Tab.Navigator
            backBehavior="history"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    height: 75,
                    paddingBottom: 12,
                    paddingTop: 8,
                    backgroundColor: "white",
                    borderTopWidth: 0,
                    elevation: 20,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                },
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName = "home";
                    if (route.name === "Home") iconName = focused ? "home" : "home-outline";
                    else if (route.name === "Capture") iconName = focused ? "camera" : "camera-outline";
                    else if (route.name === "Status") iconName = focused ? "stats-chart" : "stats-chart-outline";
                    else if (route.name === "History") iconName = focused ? "time" : "time-outline";
                    else if (route.name === "Profile") iconName = focused ? "person" : "person-outline";

                    return <Ionicons name={iconName} size={24} color={color} />;
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={FarmerHomeScreen}
                options={{ title: "Home" }}
            />
            <Tab.Screen
                name="Capture"
                component={FarmerCameraScreen}
                options={{ title: "Capture" }}
            />
            <Tab.Screen
                name="Status"
                component={FarmerStatusScreen}
                options={{ title: "Status" }}
            />
            <Tab.Screen
                name="History"
                component={FarmerHistoryScreen}
                options={{ title: "History" }}
            />
            <Tab.Screen
                name="Profile"
                component={FarmerProfileScreen}
                options={{ title: "Profile" }}
            />

            {/* Secondary Capture Flow Screens (Visible in Farmer Tab Bar) */}
            <Tab.Screen
                name="CaptureIndex"
                component={FarmerCaptureScreen}
                options={{ title: "capture/index" }}
            />
            <Tab.Screen
                name="CaptureStage"
                component={FarmerCaptureStageScreen}
                options={{ title: "capture/stage" }}
            />
            <Tab.Screen
                name="CaptureCamera"
                component={FarmerCameraScreen}
                options={{ title: "capture/camera" }}
            />
            <Tab.Screen
                name="CapturePreview"
                component={FarmerPreviewScreen}
                options={{ title: "capture/previ..." }}
            />
            <Tab.Screen
                name="Success"
                component={FarmerCaptureSuccessScreen}
                options={{ title: "capture/success" }}
            />
            <Tab.Screen
                name="CaptureGuidance"
                component={FarmerCaptureGuidanceScreen}
                options={{ title: "capture/guida..." }}
            />
        </Tab.Navigator>
    );
}
