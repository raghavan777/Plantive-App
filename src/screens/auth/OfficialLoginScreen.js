import { useContext, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";

const Input = ({ label, value, setValue, placeholder, secure }) => (
    <View style={{ marginBottom: 16 }}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            secureTextEntry={secure}
            style={styles.input}
        />
    </View>
);

export default function OfficialLoginScreen() {
    const { loginOfficer } = useContext(AuthContext);

    const [tab, setTab] = useState("login");

    const [officialId, setOfficialId] = useState("");
    const [password, setPassword] = useState("");
    const [captchaInput, setCaptchaInput] = useState("");

    const handleLogin = () => {
        // Demo validation (replace with API later)
        if (officialId === "11111" && password === "12345" && captchaInput === "VER1UV") {
            loginOfficer();   // 🔥 THIS triggers redirect to Officer Dashboard
        } else {
            alert("Invalid credentials or captcha");
        }
    };

    const handleRegister = () => {
        alert("Register API later");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Official Login</Text>
                </View>

                {/* Title */}
                <View style={styles.center}>
                    <Text style={styles.title}>Field Official</Text>
                    <Text style={styles.sub}>क्षेत्र अधिकारी</Text>

                    <View style={styles.badge}>
                        <Text style={{ color: "#2E7D32" }}>Government Official Access</Text>
                    </View>
                </View>

                {/* Tabs */}
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

                {/* LOGIN FORM */}
                {tab === "login" && (
                    <View style={styles.form}>
                        <Input
                            label="Official ID *"
                            value={officialId}
                            setValue={setOfficialId}
                            placeholder="Enter your official ID"
                        />

                        <Input
                            label="Password *"
                            value={password}
                            setValue={setPassword}
                            placeholder="Enter your password"
                            secure
                        />

                        {/* Captcha */}
                        <Text style={styles.label}>Security Verification</Text>
                        <View style={styles.captchaBox}>
                            <Text style={styles.captchaText}>VER1UV</Text>
                        </View>

                        <TextInput
                            placeholder="Enter the code above"
                            value={captchaInput}
                            onChangeText={setCaptchaInput}
                            style={styles.input}
                        />

                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* REGISTER FORM */}
                {tab === "register" && (
                    <View style={styles.form}>
                        <Input label="Official ID *" placeholder="Enter your government official ID" />
                        <Input label="Phone Number *" placeholder="Enter 10-digit mobile number" />
                        <Input label="Username *" placeholder="Choose a username" />
                        <Input label="Create Password *" placeholder="Create a strong password" secure />
                        <Input label="Email ID *" placeholder="Enter official email address" />

                        <Text style={styles.label}>Security Verification</Text>
                        <View style={styles.captchaBox}>
                            <Text style={styles.captchaText}>VER1UV</Text>
                        </View>

                        <TextInput
                            placeholder="Enter the code above"
                            style={styles.input}
                        />

                        <TouchableOpacity style={styles.button} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Register as Official</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </ScrollView>
        </SafeAreaView>
    );
}

const GREEN = "#2E7D32";
const LIGHT_GREEN = "#E8F5E9";

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f3f6f4" },

    header: { backgroundColor: GREEN, padding: 16 },
    headerText: { color: "white", fontSize: 18, fontWeight: "600" },

    center: { alignItems: "center", marginVertical: 20 },
    title: { fontSize: 22, fontWeight: "bold" },
    sub: { color: "#666", marginTop: 2 },

    badge: {
        borderWidth: 1,
        borderColor: GREEN,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 10,
        backgroundColor: LIGHT_GREEN,
    },

    tabContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
        backgroundColor: "#eee",
        borderRadius: 10,
        overflow: "hidden",
    },

    tab: {
        flex: 1,
        padding: 12,
        alignItems: "center",
    },

    activeTab: {
        backgroundColor: GREEN,
    },

    tabText: { color: "#555", fontWeight: "600" },
    activeText: { color: "white", fontWeight: "bold" },

    form: { padding: 20 },

    label: { marginBottom: 6, fontWeight: "600" },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        backgroundColor: "white",
        marginBottom: 14,
    },

    captchaBox: {
        borderWidth: 1,
        borderColor: GREEN,
        padding: 14,
        borderRadius: 10,
        marginBottom: 12,
        backgroundColor: "#f8fff8",
    },

    captchaText: {
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 3,
        color: "#1b3a1b",
    },

    button: {
        backgroundColor: GREEN,
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
