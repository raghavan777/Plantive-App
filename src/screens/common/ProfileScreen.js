import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subtitle}>User Profile Information</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f6f4",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#2e7d32",
    },
    subtitle: {
        marginTop: 8,
        color: "#666",
    },
});
