import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import useRoleBackPolicy from "../../hooks/useRoleBackPolicy";
import colors from "../../theme/colors";

export default function FarmerCaptureSuccessScreen({ route, navigation }) {
    const [countdown, setCountdown] = useState(10);
    useRoleBackPolicy({ navigation, homeRoute: "Home" });

    const submissionId = route?.params?.submissionId || "PMFBY-7721-092";
    const imageUri = route?.params?.image || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800";

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigation.navigate("Home");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Success</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.victoryCard}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="checkmark-circle" size={80} color="white" />
                    </View>
                    <Text style={styles.victoryTitle}>All Set!</Text>
                    <Text style={styles.victorySub}>Your report has been successfully submitted for processing.</Text>

                    <View style={styles.idBadge}>
                        <Text style={styles.idLabel}>ID: </Text>
                        <Text style={styles.idValue}>{submissionId}</Text>
                        <TouchableOpacity style={{ marginLeft: 8 }}>
                            <Ionicons name="copy-outline" size={16} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* DETAILS SECTION */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>What's Next?</Text>
                    <StepItem
                        icon="search-outline"
                        title="AI Verification"
                        desc="Our AI is carefully analyzing your images for crop health."
                        active
                    />
                    <StepItem
                        icon="person-outline"
                        title="Officer Review"
                        desc="A field officer will review the data for final approval."
                    />
                    <StepItem
                        icon="wallet-outline"
                        title="Claim Disbursement"
                        desc="Funds will be credited to your linked bank account."
                    />
                </View>

                {/* IMAGE MINI PREVIEW */}
                <View style={styles.miniPreviewCard}>
                    <Image source={{ uri: imageUri }} style={styles.miniImage} />
                    <View style={styles.miniInfo}>
                        <Text style={styles.miniDate}>{new Date().toLocaleDateString()}</Text>
                        <Text style={styles.miniStatus}>Pending Approval</Text>
                    </View>
                </View>

                <View style={styles.countdownBox}>
                    <Text style={styles.countdownText}>Redirecting home in {countdown}s</Text>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressInner, { width: `${(countdown / 10) * 100}%` }]} />
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            <View style={styles.dock}>
                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={styles.primaryBtnText}>Back to Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => navigation.navigate("Status")}
                >
                    <Text style={styles.secondaryBtnText}>Track My Claim</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const StepItem = ({ icon, title, desc, active }) => (
    <View style={styles.stepRow}>
        <View style={[styles.stepIconWrap, active && { backgroundColor: colors.primary }]}>
            <Ionicons name={icon} size={20} color={active ? "white" : colors.textSecondary} />
        </View>
        <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={[styles.stepTitle, active && { color: colors.primary }]}>{title}</Text>
            <Text style={styles.stepDesc}>{desc}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { height: 70, backgroundColor: colors.primary, justifyContent: "center", alignItems: "center" },
    headerTitle: { color: "white", fontSize: 20, fontWeight: "bold" },

    content: { padding: 25 },
    victoryCard: {
        backgroundColor: "white",
        borderRadius: 30,
        padding: 30,
        alignItems: "center",
        elevation: 10,
        marginBottom: 25,
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        elevation: 5,
    },
    victoryTitle: { fontSize: 28, fontWeight: "bold", color: colors.text },
    victorySub: { fontSize: 14, color: colors.textSecondary, textAlign: "center", marginTop: 8, lineHeight: 20 },
    idBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.primary + "10",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 12,
        marginTop: 20,
    },
    idLabel: { color: colors.textSecondary, fontWeight: "bold" },
    idValue: { color: colors.primary, fontWeight: "bold" },

    card: { backgroundColor: "white", borderRadius: 24, padding: 25, marginBottom: 20, elevation: 4 },
    cardTitle: { fontSize: 18, fontWeight: "bold", color: colors.text, marginBottom: 20 },

    stepRow: { flexDirection: "row", marginBottom: 20 },
    stepIconWrap: { width: 44, height: 44, borderRadius: 15, backgroundColor: "#F5F5F5", justifyContent: "center", alignItems: "center" },
    stepTitle: { fontSize: 16, fontWeight: "bold", color: colors.text },
    stepDesc: { fontSize: 13, color: colors.textSecondary, marginTop: 4, lineHeight: 18 },

    miniPreviewCard: {
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 12,
        alignItems: "center",
        elevation: 3,
        marginBottom: 25,
    },
    miniImage: { width: 60, height: 60, borderRadius: 12 },
    miniInfo: { marginLeft: 15 },
    miniDate: { fontSize: 12, color: colors.textSecondary },
    miniStatus: { fontSize: 14, fontWeight: "bold", color: colors.accent, marginTop: 2 },

    countdownBox: { alignItems: "center", marginBottom: 20 },
    countdownText: { fontSize: 12, color: colors.textSecondary, marginBottom: 8 },
    progressBar: { width: "100%", height: 4, backgroundColor: "#E0E0E0", borderRadius: 2, overflow: "hidden" },
    progressInner: { height: "100%", backgroundColor: colors.accent },

    dock: { padding: 25, gap: 12 },
    primaryBtn: { backgroundColor: colors.primary, padding: 18, borderRadius: 18, alignItems: "center", elevation: 5 },
    primaryBtnText: { color: "white", fontSize: 18, fontWeight: "bold" },
    secondaryBtn: { padding: 15, alignItems: "center" },
    secondaryBtnText: { color: colors.primary, fontWeight: "bold", fontSize: 16 },
});
