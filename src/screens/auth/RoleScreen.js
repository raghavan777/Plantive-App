import { useNavigation } from "@react-navigation/native";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

export default function RoleScreen() {
    const navigation = useNavigation();

    const goFarmer = () => {
        navigation.navigate("FarmerLogin");
    };

    const goOfficial = () => {
        navigation.navigate("OfficialLogin");
    };

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f7f5" />

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Select Your Role</Text>
                <Text style={styles.subtitle}>अपनी भूमिका चुनें</Text>

                {/* FARMER CARD */}
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.85}
                    onPress={goFarmer}
                >
                    <Text style={styles.icon}>👨‍🌾</Text>
                    <Text style={styles.role}>Farmer</Text>
                    <Text style={styles.hindi}>किसान</Text>

                    <Text style={styles.desc}>
                        Upload crop images, track claims, get AI analysis
                    </Text>
                </TouchableOpacity>

                {/* OFFICIAL CARD */}
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.85}
                    onPress={goOfficial}
                >
                    <Text style={styles.icon}>🧑‍💼</Text>
                    <Text style={styles.role}>Field Official</Text>
                    <Text style={styles.hindi}>क्षेत्र अधिकारी</Text>

                    <Text style={styles.desc}>
                        Verify crops, submit reports, manage assigned farms
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#f5f7f5",
    },

    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: "center",
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        color: "#1b5e20",
    },

    subtitle: {
        textAlign: "center",
        marginBottom: 25,
        color: "#666",
        fontSize: 14,
    },

    card: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 22,
        marginBottom: 20,
        alignItems: "center",

        borderWidth: 1.2,
        borderColor: "#4caf50",

        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },

        elevation: 4,
    },

    icon: {
        fontSize: 42,
        marginBottom: 10,
    },

    role: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2e7d32",
    },

    hindi: {
        fontSize: 15,
        color: "#777",
        marginTop: 2,
    },

    desc: {
        fontSize: 13,
        textAlign: "center",
        marginTop: 8,
        color: "#555",
        lineHeight: 18,
    },
});
