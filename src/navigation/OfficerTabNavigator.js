import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileScreen from "../screens/common/ProfileScreen";
import AssignmentsScreen from "../screens/official/AssignmentsScreen";
import OfficialDashboardScreen from "../screens/official/OfficialDashboardScreen";
import ReportsScreen from "../screens/official/ReportsScreen";
import VerificationScreen from "../screens/official/VerificationScreen";

const Tab = createBottomTabNavigator();

export default function OfficerTabNavigator() {
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

                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 4,
                },

                tabBarIcon: ({ color, size }) => {
                    let iconName = "home";

                    if (route.name === "OfficerHome") iconName = "home";
                    else if (route.name === "Assignments") iconName = "clipboard";
                    else if (route.name === "Reports") iconName = "document-text";
                    else if (route.name === "Profile") iconName = "person";

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            {/* HOME */}
            <Tab.Screen
                name="OfficerHome"
                component={OfficialDashboardScreen}
                options={{ title: "Home" }}
            />

            {/* ASSIGNMENTS */}
            <Tab.Screen
                name="Assignments"
                component={AssignmentsScreen}
                options={{ title: "Assignments" }}
            />

            {/* REPORTS */}
            <Tab.Screen
                name="Reports"
                component={ReportsScreen}
                options={{ title: "Reports" }}
            />

            {/* PROFILE */}
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: "Profile" }}
            />

            <Tab.Screen
                name="Verify"
                component={VerificationScreen}
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: "none" },
                }}
            />
        </Tab.Navigator>
    );
}
