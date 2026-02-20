import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function OfficialProfile() {
    const { logout } = useContext(AuthContext);

    return (
        <View style={{ padding: 20 }}>
            <Text>Official Profile</Text>
            <Text>Name: Agriculture Officer</Text>
            <Text>Department: State Agriculture</Text>

            <Button title="Logout" onPress={logout} />
        </View>
    );
}
