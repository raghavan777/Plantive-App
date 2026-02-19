import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function LanguageScreen() {
    const navigation = useNavigation();
    const [selected, setSelected] = useState("en");

    const handleContinue = () => {
        // Navigate to Role Selection
        navigation.navigate("Role");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose Language</Text>
            <Text style={styles.subtitle}>भाषा चुनें</Text>

            {/* English */}
            <TouchableOpacity
                style={[
                    styles.card,
                    selected === "en" && styles.selectedCard,
                ]}
                onPress={() => setSelected("en")}
            >
                <Text style={styles.lang}>English</Text>
            </TouchableOpacity>

            {/* Hindi */}
            <TouchableOpacity
                style={[
                    styles.card,
                    selected === "hi" && styles.selectedCard,
                ]}
                onPress={() => setSelected("hi")}
            >
                <Text style={styles.lang}>Hindi</Text>
            </TouchableOpacity>

            {/* Continue Button */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Role")}
            >
                <Text>Continue</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f7f5",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold",
        color: "#1b5e20",
    },
    subtitle: {
        textAlign: "center",
        marginBottom: 20,
        color: "#666",
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    selectedCard: {
        borderColor: "#2e7d32",
        backgroundColor: "#e8f5e9",
    },
    lang: {
        fontSize: 18,
        color: "#333",
    },
    button: {
        marginTop: 20,
        backgroundColor: "#2e7d32",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
