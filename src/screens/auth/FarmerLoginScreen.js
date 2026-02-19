import { useContext, useEffect, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function FarmerLoginScreen() {
    const { login } = useContext(AuthContext);

    const [step, setStep] = useState("phone"); // phone | otp
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(60);

    // Countdown for resend OTP
    useEffect(() => {
        if (step === "otp" && timer > 0) {
            const interval = setInterval(() => setTimer(timer - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer, step]);

    const sendOTP = () => {
        if (phone.length !== 10) {
            alert("Enter valid 10-digit mobile number");
            return;
        }

        // TODO → Call backend API to send OTP
        alert("Demo OTP: 123456");

        setStep("otp");
        setTimer(60);
    };

    const verifyOTP = () => {
        if (otp !== "123456") {
            alert("Invalid OTP");
            return;
        }

        // Success → Login
        login({ role: "farmer" });
    };

    const resendOTP = () => {
        if (timer === 0) {
            sendOTP();
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Farmer Login</Text>
            </View>

            {/* Title */}
            <View style={styles.center}>
                <Text style={styles.title}>Farmer Login</Text>
                <Text style={styles.sub}>किसान लॉगिन</Text>
            </View>

            {/* PHONE INPUT */}
            {step === "phone" && (
                <View style={styles.form}>
                    <Text style={styles.label}>Mobile Number *</Text>

                    <View style={styles.phoneRow}>
                        <Text style={styles.code}>+91</Text>
                        <TextInput
                            placeholder="Enter 10-digit mobile number"
                            keyboardType="numeric"
                            value={phone}
                            onChangeText={setPhone}
                            style={styles.phoneInput}
                            maxLength={10}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={sendOTP}>
                        <Text style={styles.buttonText}>Send OTP →</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* OTP INPUT */}
            {step === "otp" && (
                <View style={styles.form}>
                    <Text style={styles.otpTitle}>Enter OTP</Text>
                    <Text style={styles.sent}>
                        Sent to +91 {phone}
                    </Text>

                    <Text style={styles.label}>OTP *</Text>

                    <TextInput
                        placeholder="Enter 6-digit OTP"
                        keyboardType="numeric"
                        value={otp}
                        onChangeText={setOtp}
                        style={styles.input}
                        maxLength={6}
                    />

                    <Text style={styles.timer}>
                        {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                    </Text>

                    <TouchableOpacity style={styles.button} onPress={verifyOTP}>
                        <Text style={styles.buttonText}>Verify OTP ✓</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.change}
                        onPress={() => setStep("phone")}
                    >
                        <Text style={{ color: "#2E7D32" }}>← Change Mobile Number</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={{ color: "#2E7D32" }}>
                    Use the same mobile number registered for PMFBY account
                </Text>
            </View>

        </SafeAreaView>
    );
}

const GREEN = "#2E7D32";

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f3f6f4" },

    header: { backgroundColor: GREEN, padding: 16 },
    headerText: { color: "white", fontSize: 18, fontWeight: "600" },

    center: { alignItems: "center", marginVertical: 20 },
    title: { fontSize: 22, fontWeight: "bold" },
    sub: { color: "#666", marginTop: 2 },

    form: { padding: 20 },

    label: { marginBottom: 6, fontWeight: "600" },

    phoneRow: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        marginBottom: 14,
        backgroundColor: "white",
        alignItems: "center",
    },

    code: {
        paddingHorizontal: 12,
        fontWeight: "bold",
        color: "#444",
    },

    phoneInput: {
        flex: 1,
        padding: 12,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        backgroundColor: "white",
        marginBottom: 14,
    },

    button: {
        backgroundColor: GREEN,
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 6,
    },

    buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },

    otpTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 4,
    },

    sent: {
        textAlign: "center",
        color: "#666",
        marginBottom: 20,
    },

    timer: {
        color: "#888",
        marginBottom: 12,
    },

    change: {
        alignItems: "center",
        marginTop: 14,
    },

    footer: {
        marginTop: "auto",
        backgroundColor: "#E8F5E9",
        padding: 14,
        margin: 20,
        borderRadius: 10,
    },
});
