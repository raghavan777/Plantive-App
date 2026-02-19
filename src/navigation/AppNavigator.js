import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";

import AuthNavigator from "./AuthNavigator";
import FarmerTabNavigator from "./FarmerTabNavigator";
import OfficerTabNavigator from "./OfficerTabNavigator";

import { AuthContext } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { userRole } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!userRole && (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}

      {userRole === "farmer" && (
        <Stack.Screen name="FarmerApp" component={FarmerTabNavigator} />
      )}

      {userRole === "officer" && (
        <Stack.Screen name="OfficerApp" component={OfficerTabNavigator} />
      )}
    </Stack.Navigator>
  );
}
