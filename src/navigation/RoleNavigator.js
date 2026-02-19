import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import CaptureScreen from "../screens/farmer/CaptureScreen";
import FarmerDashboard from "../screens/farmer/FarmerHomeScreen";
import HistoryScreen from "../screens/farmer/HistoryScreen";
import FarmerProfile from "../screens/farmer/ProfileScreen";
import StatusScreen from "../screens/farmer/StatusScreen";

import OfficialHistory from "../screens/official/HistoryScreen";
import OfficialDashboard from "../screens/official/OfficialDashboard";
import OfficialProfile from "../screens/official/ProfileScreen";
import ReportsScreen from "../screens/official/ReportsScreen";
import VerificationScreen from "../screens/official/VerificationScreen";

const Tab = createBottomTabNavigator();

export default function RoleNavigator() {
    const { user } = useContext(AuthContext);

    if (user.role === "farmer") {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={FarmerDashboard} />
                <Tab.Screen name="Capture" component={CaptureScreen} />
                <Tab.Screen name="Status" component={StatusScreen} />
                <Tab.Screen name="History" component={HistoryScreen} />
                <Tab.Screen name="Profile" component={FarmerProfile} />
            </Tab.Navigator>
        );
    }

    return (
        <Tab.Navigator>
            <Tab.Screen name="Dashboard" component={OfficialDashboard} />
            <Tab.Screen name="Verify" component={VerificationScreen} />
            <Tab.Screen name="Reports" component={ReportsScreen} />
            <Tab.Screen name="History" component={OfficialHistory} />
            <Tab.Screen name="Profile" component={OfficialProfile} />
        </Tab.Navigator>
    );
}
