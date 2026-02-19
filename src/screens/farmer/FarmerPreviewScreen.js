import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PreviewScreen({ route, navigation }) {
    const { image, stage } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />

            <View style={styles.infoBox}>
                <Text style={styles.stage}>Crop Stage: {stage}</Text>

                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={() => navigation.navigate("Success")}
                >
                    <Text style={{ color: "#fff" }}>Submit for Analysis</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },

    image: { flex: 1 },

    infoBox: {
        padding: 15,
        backgroundColor: "#fff",
    },

    stage: {
        fontWeight: "bold",
        marginBottom: 10,
    },

    submitBtn: {
        backgroundColor: "#3aa655",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
    },
});
