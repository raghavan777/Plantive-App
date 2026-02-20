import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FarmerLoginScreen from "../screens/auth/FarmerLoginScreen";
import LanguageScreen from "../screens/auth/LanguageScreen";
import OfficialLoginScreen from "../screens/auth/OfficialLoginScreen";
import RoleScreen from "../screens/auth/RoleScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Language" component={LanguageScreen} />
            <Stack.Screen name="Role" component={RoleScreen} />
            <Stack.Screen name="FarmerLogin" component={FarmerLoginScreen} />
            <Stack.Screen name="OfficialLogin" component={OfficialLoginScreen} />
        </Stack.Navigator>
    );
}
