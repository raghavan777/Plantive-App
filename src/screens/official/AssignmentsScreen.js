import { StyleSheet, Text, View } from "react-native";

export default function AssignmentsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Assignments</Text>
            <Text style={styles.subtitle}>List of pending and completed assignments.</Text>
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
        textAlign: "center",
        paddingHorizontal: 20,
    },
});
