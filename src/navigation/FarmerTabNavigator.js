import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Farmer Screens
import FarmerCameraScreen from "../screens/farmer/FarmerCameraScreen.js";
import FarmerCaptureScreen from "../screens/farmer/FarmerCaptureScreen.js";
import FarmerHistoryScreen from "../screens/farmer/FarmerHistoryScreen.js";
import FarmerHomeScreen from "../screens/farmer/FarmerHomeScreen.js";
import FarmerPreviewScreen from "../screens/farmer/FarmerPreviewScreen.js";
import FarmerProfileScreen from "../screens/farmer/FarmerProfileScreen.js";
import FarmerStatusScreen from "../screens/farmer/FarmerStatusScreen.js";

const Tab = createBottomTabNavigator();

export default function FarmerTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: "#2e7d32",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 6,
                    backgroundColor: "#fff",
                    borderTopWidth: 0.5,
                },
                tabBarLabelPosition: "beside-icon",
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginLeft: 4,
                },
                tabBarItemStyle: {
                    width: 140,
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName = "home";
                    if (route.name === "Home") iconName = "home";
                    else if (route.name === "Capture") iconName = "camera";
                    else if (route.name === "Status") iconName = "bar-chart";
                    else if (route.name === "History") iconName = "clipboard";
                    else if (route.name === "Profile") iconName = "person";
                    else {
                        iconName = "chevron-down";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
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

            {/* Secondary Capture Flow Screens (Hidden from Tab Bar) */}
            <Tab.Screen
                name="CaptureIndex"
                component={FarmerCaptureScreen}
                options={{ title: "capture/index", tabBarButton: () => null }}
            />
            <Tab.Screen
                name="CaptureCamera"
                component={FarmerCameraScreen}
                options={{ title: "capture/camera", tabBarButton: () => null }}
            />
            <Tab.Screen
                name="CapturePreview"
                component={FarmerPreviewScreen}
                options={{ title: "capture/previ...", tabBarButton: () => null }}
            />
        </Tab.Navigator>
    );
}
