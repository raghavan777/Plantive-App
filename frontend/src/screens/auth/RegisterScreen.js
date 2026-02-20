import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import colors from "../../theme/colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function RegisterScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color={colors.primary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Create Account</Text>
                </View>

                <View style={styles.iconContainer}>
                    <View style={styles.iconCircle}>
                        <FontAwesome5 name="user-plus" size={40} color="white" />
                    </View>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            placeholder="Enter your name"
                            style={styles.input}
                            placeholderTextColor={colors.textSecondary + "90"}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mobile Number</Text>
                        <TextInput
                            placeholder="Enter mobile number"
                            keyboardType="numeric"
                            style={styles.input}
                            placeholderTextColor={colors.textSecondary + "90"}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            placeholder="Create password"
                            secureTextEntry
                            style={styles.input}
                            placeholderTextColor={colors.textSecondary + "90"}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.buttonText}>Register Now</Text>
                        <Ionicons name="chevron-forward" size={20} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.loginText}>Already have an account? <Text style={styles.loginHighlight}>Login</Text></Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scroll: { padding: 24 },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.primary,
        marginLeft: 15,
    },
    iconContainer: {
        alignItems: "center",
        marginBottom: 40,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    form: {
        backgroundColor: "white",
        padding: 24,
        borderRadius: 24,
        elevation: 3,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1.5,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
        color: colors.text,
        backgroundColor: "#F9FBFA",
    },
    button: {
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        marginTop: 10,
        elevation: 4,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    loginLink: {
        marginTop: 20,
        alignItems: "center",
    },
    loginText: {
        color: colors.textSecondary,
        fontSize: 14,
    },
    loginHighlight: {
        color: colors.primary,
        fontWeight: "bold",
    }
});

