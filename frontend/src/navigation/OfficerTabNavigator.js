import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../theme/colors";

// Official Screens
import ProfileScreen from "../screens/common/ProfileScreen.js";
import AssignmentsScreen from "../screens/official/AssignmentsScreen.js";
import FarmDetailsScreen from "../screens/official/FarmDetailsScreen.js";
import OfficialDashboardScreen from "../screens/official/OfficialDashboardScreen.js";
import ReportsScreen from "../screens/official/ReportsScreen.js";
import VerificationAssessmentScreen from "../screens/official/VerificationAssessmentScreen.js";
import VerificationCameraScreen from "../screens/official/VerificationCameraScreen.js";
import VerificationGpsScreen from "../screens/official/VerificationGpsScreen.js";
import VerificationScreen from "../screens/official/VerificationScreen.js";

const Tab = createBottomTabNavigator();

export default function OfficerTabNavigator() {
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
                    if (route.name === "OfficerHome") iconName = focused ? "home" : "home-outline";
                    else if (route.name === "Assignments") iconName = focused ? "clipboard" : "clipboard-outline";
                    else if (route.name === "Reports") iconName = focused ? "analytics" : "analytics-outline";
                    else if (route.name === "Profile") iconName = focused ? "person" : "person-outline";

                    return <Ionicons name={iconName} size={24} color={color} />;
                },
            })}
        >
            <Tab.Screen
                name="OfficerHome"
                component={OfficialDashboardScreen}
                options={{ title: "Home" }}
            />
            <Tab.Screen
                name="Assignments"
                component={AssignmentsScreen}
                options={{ title: "Assignments" }}
            />
            <Tab.Screen
                name="Reports"
                component={ReportsScreen}
                options={{ title: "History" }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: "Profile" }}
            />
            <Tab.Screen
                name="FarmDetails"
                component={FarmDetailsScreen}
                options={{ title: "farm-details" }}
            />
            <Tab.Screen
                name="VerificationGPS"
                component={VerificationGpsScreen}
                options={{ title: "verification/gps" }}
            />
            <Tab.Screen
                name="Verify"
                component={VerificationScreen}
                options={{ title: "verification/index" }}
            />
            <Tab.Screen
                name="VerificationCamera"
                component={VerificationCameraScreen}
                options={{ title: "verification/cam..." }}
            />
            <Tab.Screen
                name="VerificationAssessment"
                component={VerificationAssessmentScreen}
                options={{ title: "verification/asses..." }}
            />
        </Tab.Navigator>
    );
}
