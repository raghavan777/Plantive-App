import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function ProfileScreen() {
    const { logout } = useContext(AuthContext);

    return (
        <View style={{ padding: 20 }}>
            <Text>Farmer Profile</Text>

            <Text>Name: Demo Farmer</Text>
            <Text>Village: Example</Text>

            <Button title="Logout" onPress={logout} />
        </View>
    );
}
