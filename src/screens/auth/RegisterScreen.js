import { Button, Text, TextInput, View } from "react-native";

export default function RegisterScreen({ navigation }) {
    return (
        <View style={{ padding: 20 }}>
            <Text>Farmer Registration</Text>

            <TextInput placeholder="Name" style={{ borderWidth: 1, marginBottom: 10 }} />
            <TextInput placeholder="Phone" style={{ borderWidth: 1, marginBottom: 10 }} />
            <TextInput placeholder="Password" secureTextEntry style={{ borderWidth: 1, marginBottom: 10 }} />

            <Button title="Register" onPress={() => navigation.navigate("Login")} />
        </View>
    );
}
