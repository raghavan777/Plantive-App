import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FarmerCaptureScreen from "../screens/farmer/FarmerCaptureScreen";
import FarmerHistoryScreen from "../screens/farmer/FarmerHistoryScreen";
import FarmerHomeScreen from "../screens/farmer/FarmerHomeScreen";
import FarmerProfileScreen from "../screens/farmer/FarmerProfileScreen";

const Tab = createBottomTabNavigator();

export default function FarmerTabNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Home"
                component={FarmerHomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Capture"
                component={FarmerCaptureScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="camera" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="History"
                component={FarmerHistoryScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="time" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={FarmerProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
