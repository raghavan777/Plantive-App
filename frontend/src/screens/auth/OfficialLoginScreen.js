import { useContext, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import colors from "../../theme/colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

const Input = ({ label, value, setValue, placeholder, secure, icon }) => (
    <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputWrapper}>
            <Ionicons name={icon} size={20} color={colors.primary} style={styles.inputIcon} />
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                placeholderTextColor={colors.textSecondary + "80"}
                secureTextEntry={secure}
                style={styles.input}
            />
        </View>
    </View>
);

export default function OfficialLoginScreen() {
    const { loginOfficer } = useContext(AuthContext);

    const [tab, setTab] = useState("login");

    const [officialId, setOfficialId] = useState("");
    const [password, setPassword] = useState("");
    const [captchaInput, setCaptchaInput] = useState("");

    const handleLogin = () => {
        if (officialId === "11111" && password === "12345" && captchaInput === "VER1UV") {
            loginOfficer();
        } else {
            alert("Invalid credentials or captcha");
        }
    };

    const handleRegister = () => {
        alert("Register function coming soon");
    };

    return (
        <SafeAreaView style={styles.safe}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.header}>
                        <FontAwesome5 name="user-shield" size={24} color="white" />
                        <Text style={styles.headerText}>Official Portal</Text>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.center}>
                            <Text style={styles.title}>Official Access</Text>
                            <Text style={styles.sub}>क्षेत्र अधिकारी पोर्टल</Text>

                            <View style={styles.badge}>
                                <Ionicons name="shield-checkmark" size={16} color={colors.primary} />
                                <Text style={styles.badgeText}>Secured Officer Login</Text>
                            </View>
                        </View>

                        <View style={styles.tabContainer}>
                            <TouchableOpacity
                                style={[styles.tab, tab === "login" && styles.activeTab]}
                                onPress={() => setTab("login")}
                            >
                                <Text style={tab === "login" ? styles.activeText : styles.tabText}>
                                    Login
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.tab, tab === "register" && styles.activeTab]}
                                onPress={() => setTab("register")}
                            >
                                <Text style={tab === "register" ? styles.activeText : styles.tabText}>
                                    Register
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.formCard}>
                            {tab === "login" ? (
                                <View>
                                    <Input
                                        label="Official ID *"
                                        value={officialId}
                                        setValue={setOfficialId}
                                        placeholder="Enter your official ID"
                                        icon="person-outline"
                                    />

                                    <Input
                                        label="Password *"
                                        value={password}
                                        setValue={setPassword}
                                        placeholder="Enter your password"
                                        secure
                                        icon="lock-closed-outline"
                                    />

                                    <Text style={styles.label}>Security Verification</Text>
                                    <View style={styles.captchaBox}>
                                        <Text style={styles.captchaText}>VER1UV</Text>
                                        <TouchableOpacity onPress={() => { }}>
                                            <Ionicons name="refresh-circle" size={30} color={colors.primary} />
                                        </TouchableOpacity>
                                    </View>

                                    <TextInput
                                        placeholder="Enter verification code"
                                        placeholderTextColor={colors.textSecondary + "80"}
                                        value={captchaInput}
                                        onChangeText={setCaptchaInput}
                                        style={styles.simpleInput}
                                    />

                                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                                        <Text style={styles.buttonText}>Authenticate</Text>
                                        <Ionicons name="finger-print" size={20} color="white" />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View>
                                    <Input label="Full Name *" placeholder="Enter full name" icon="person-outline" />
                                    <Input label="Official ID *" placeholder="Enter government ID" icon="card-outline" />
                                    <Input label="Phone *" placeholder="Contact number" icon="call-outline" />
                                    <Input label="Password *" placeholder="Create password" secure icon="lock-closed-outline" />

                                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                                        <Text style={styles.buttonText}>Request Access</Text>
                                        <Ionicons name="send" size={18} color="white" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },

    header: {
        backgroundColor: colors.primary,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 4,
    },
    headerText: { color: "white", fontSize: 20, fontWeight: "bold" },

    content: { padding: 24 },

    center: { alignItems: "center", marginBottom: 30 },
    title: { fontSize: 28, fontWeight: "bold", color: colors.primary },
    sub: { color: colors.textSecondary, fontSize: 18 },

    badge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: 12,
        backgroundColor: colors.primary + "15",
        borderWidth: 1,
        borderColor: colors.primary + "30",
    },
    badgeText: { color: colors.primary, fontSize: 12, fontWeight: "700" },

    tabContainer: {
        flexDirection: "row",
        backgroundColor: "#E0E5E2",
        borderRadius: 15,
        padding: 5,
        marginBottom: 24,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        borderRadius: 12,
    },
    activeTab: {
        backgroundColor: "white",
        elevation: 2,
    },
    tabText: { color: colors.textSecondary, fontWeight: "600" },
    activeText: { color: colors.primary, fontWeight: "bold" },

    formCard: {
        backgroundColor: "white",
        padding: 24,
        borderRadius: 24,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },

    inputContainer: { marginBottom: 20 },
    label: { marginBottom: 8, fontWeight: "600", fontSize: 14, color: colors.text },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: colors.border,
        borderRadius: 12,
        backgroundColor: "#F9FBFA",
        paddingHorizontal: 12,
    },
    inputIcon: { marginRight: 10 },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: colors.text,
    },

    simpleInput: {
        borderWidth: 1.5,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 12,
        backgroundColor: "#F9FBFA",
        marginBottom: 20,
        fontSize: 16,
        color: colors.text,
        textAlign: "center",
    },

    captchaBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.primary + "40",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: "#F0F5F2",
        borderStyle: "dashed",
    },
    captchaText: {
        fontSize: 22,
        fontWeight: "bold",
        letterSpacing: 6,
        color: colors.primary,
        fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    },

    button: {
        backgroundColor: colors.primary,
        padding: 18,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        elevation: 4,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    buttonText: { color: "white", fontWeight: "bold", fontSize: 18 },
});

