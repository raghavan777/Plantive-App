import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
                    width: 165,
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName = "home";
                    if (route.name === "OfficerHome") iconName = "home";
                    else if (route.name === "Assignments") iconName = "clipboard";
                    else if (route.name === "Reports") iconName = "bar-chart";
                    else if (route.name === "Profile") iconName = "person";
                    else {
                        iconName = "chevron-down";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
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
                options={{ title: "farm-details", tabBarButton: () => null }}
            />
            <Tab.Screen
                name="VerificationGPS"
                component={VerificationGpsScreen}
                options={{ title: "verification/gps", tabBarButton: () => null }}
            />
            <Tab.Screen
                name="Verify"
                component={VerificationScreen}
                options={{ title: "verification/index", tabBarButton: () => null }}
            />
            <Tab.Screen
                name="VerificationCamera"
                component={VerificationCameraScreen}
                options={{ title: "verification/cam...", tabBarButton: () => null }}
            />
            <Tab.Screen
                name="VerificationAssessment"
                component={VerificationAssessmentScreen}
                options={{ title: "verification/asses...", tabBarButton: () => null }}
            />
        </Tab.Navigator>
    );
}
