import { useContext, useEffect, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import colors from "../../theme/colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function FarmerLoginScreen() {
    const { loginFarmer } = useContext(AuthContext);

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
        loginFarmer();
    };

    const resendOTP = () => {
        if (timer === 0) {
            sendOTP();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {/* Header */}
                    <View style={styles.header}>
                        <FontAwesome5 name="tractor" size={24} color="white" />
                        <Text style={styles.headerText}>Farmer Login</Text>
                    </View>

                    <View style={styles.content}>
                        {/* Title */}
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Farmer Login</Text>
                            <Text style={styles.sub}>किसान लॉगिन</Text>
                        </View>

                        {/* PHONE INPUT */}
                        {step === "phone" && (
                            <View style={styles.form}>
                                <Text style={styles.label}>Mobile Number *</Text>

                                <View style={styles.phoneRow}>
                                    <View style={styles.countryCode}>
                                        <Text style={styles.codeText}>+91</Text>
                                    </View>
                                    <TextInput
                                        placeholder="Enter 10-digit mobile number"
                                        keyboardType="numeric"
                                        value={phone}
                                        onChangeText={setPhone}
                                        style={styles.phoneInput}
                                        maxLength={10}
                                        placeholderTextColor={colors.textSecondary + "80"}
                                    />
                                </View>

                                <TouchableOpacity style={styles.button} onPress={sendOTP}>
                                    <Text style={styles.buttonText}>Send OTP</Text>
                                    <Ionicons name="arrow-forward" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* OTP INPUT */}
                        {step === "otp" && (
                            <View style={styles.form}>
                                <Text style={styles.otpTitle}>Verify OTP</Text>
                                <Text style={styles.sent}>
                                    Code sent to +91 {phone}
                                </Text>

                                <Text style={styles.label}>Enter 6-digit OTP *</Text>

                                <TextInput
                                    placeholder="Enter 6-digit OTP"
                                    keyboardType="numeric"
                                    value={otp}
                                    onChangeText={setOtp}
                                    style={styles.input}
                                    maxLength={6}
                                    placeholderTextColor={colors.textSecondary + "80"}
                                />

                                <TouchableOpacity
                                    onPress={resendOTP}
                                    disabled={timer > 0}
                                    style={styles.resendContainer}
                                >
                                    <Text style={[styles.timer, timer === 0 && styles.resendActive]}>
                                        {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP Now"}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button} onPress={verifyOTP}>
                                    <Text style={styles.buttonText}>Verify & Login</Text>
                                    <Ionicons name="checkmark-circle" size={20} color="white" />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.change}
                                    onPress={() => setStep("phone")}
                                >
                                    <Text style={styles.changeText}>← Change Mobile Number</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Footer */}
                        <View style={styles.infoBox}>
                            <Ionicons name="information-circle" size={20} color={colors.primary} />
                            <Text style={styles.infoText}>
                                Use the same mobile number registered for your PMFBY account to access benefits.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },

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

    content: {
        flex: 1,
        padding: 24,
    },

    titleContainer: { alignItems: "center", marginVertical: 30 },
    title: { fontSize: 28, fontWeight: "bold", color: colors.primary },
    sub: { color: colors.textSecondary, fontSize: 18, marginTop: 4 },

    form: {
        backgroundColor: "white",
        padding: 24,
        borderRadius: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },

    label: { marginBottom: 8, fontWeight: "600", color: colors.text, fontSize: 15 },

    phoneRow: {
        flexDirection: "row",
        borderWidth: 1.5,
        borderColor: colors.border,
        borderRadius: 12,
        marginBottom: 20,
        backgroundColor: "#F9FBFA",
        alignItems: "center",
        overflow: "hidden",
    },

    countryCode: {
        paddingHorizontal: 15,
        height: 55,
        backgroundColor: "#E8F0EA",
        justifyContent: "center",
        borderRightWidth: 1,
        borderRightColor: colors.border,
    },

    codeText: {
        fontWeight: "bold",
        color: colors.primary,
        fontSize: 16,
    },

    phoneInput: {
        flex: 1,
        padding: 15,
        fontSize: 18,
        color: colors.text,
        height: 55,
    },

    input: {
        borderWidth: 1.5,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 15,
        backgroundColor: "#F9FBFA",
        marginBottom: 10,
        fontSize: 18,
        color: colors.text,
        height: 55,
        textAlign: "center",
        letterSpacing: 4,
    },

    button: {
        backgroundColor: colors.primary,
        padding: 18,
        borderRadius: 15,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        elevation: 4,
        marginTop: 10,
    },

    buttonText: { color: "white", fontWeight: "bold", fontSize: 18 },

    otpTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.primary,
        textAlign: "center",
        marginBottom: 8,
    },

    sent: {
        textAlign: "center",
        color: colors.textSecondary,
        marginBottom: 24,
        fontSize: 14,
    },

    resendContainer: {
        alignItems: "center",
        marginBottom: 20,
    },

    timer: {
        color: colors.textSecondary,
        fontSize: 14,
    },

    resendActive: {
        color: colors.primary,
        fontWeight: "bold",
        textDecorationLine: "underline",
    },

    change: {
        alignItems: "center",
        marginTop: 20,
    },

    changeText: {
        color: colors.primary,
        fontWeight: "600",
        fontSize: 14,
    },

    infoBox: {
        marginTop: 40,
        backgroundColor: colors.primary + "10",
        padding: 18,
        borderRadius: 15,
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
    },

    infoText: {
        flex: 1,
        color: colors.primary,
        fontSize: 13,
        lineHeight: 18,
    },
});

