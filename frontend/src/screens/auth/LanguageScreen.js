import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
} from "react-native";
import colors from "../../theme/colors";
import { FontAwesome5 } from "@expo/vector-icons";

export default function LanguageScreen() {
    const navigation = useNavigation();
    const [selected, setSelected] = useState("en");

    const handleContinue = () => {
        navigation.navigate("Role");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <FontAwesome5 name="globe" size={60} color={colors.primary} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>Choose Language</Text>
                    <Text style={styles.subtitle}>भाषा चुनें</Text>
                </View>

                <View style={styles.cardsContainer}>
                    {/* English */}
                    <TouchableOpacity
                        style={[
                            styles.card,
                            selected === "en" && styles.selectedCard,
                        ]}
                        onPress={() => setSelected("en")}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.lang, selected === "en" && styles.selectedLang]}>English</Text>
                        {selected === "en" && <FontAwesome5 name="check-circle" size={20} color={colors.primary} />}
                    </TouchableOpacity>

                    {/* Hindi */}
                    <TouchableOpacity
                        style={[
                            styles.card,
                            selected === "hi" && styles.selectedCard,
                        ]}
                        onPress={() => setSelected("hi")}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.lang, selected === "hi" && styles.selectedLang]}>हिन्दी (Hindi)</Text>
                        {selected === "hi" && <FontAwesome5 name="check-circle" size={20} color={colors.primary} />}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleContinue}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
    },
    iconContainer: {
        alignItems: "center",
        marginBottom: 32,
    },
    textContainer: {
        alignItems: "center",
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: colors.primary,
    },
    subtitle: {
        fontSize: 18,
        color: colors.textSecondary,
        marginTop: 4,
    },
    cardsContainer: {
        marginBottom: 40,
    },
    card: {
        backgroundColor: colors.surface,
        padding: 20,
        borderRadius: 16,
        marginBottom: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: "transparent",
    },
    selectedCard: {
        borderColor: colors.primary,
        backgroundColor: colors.primary + "08",
    },
    lang: {
        fontSize: 18,
        color: colors.text,
        fontWeight: "500",
    },
    selectedLang: {
        color: colors.primary,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: colors.primary,
        padding: 18,
        borderRadius: 15,
        alignItems: "center",
        elevation: 5,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

