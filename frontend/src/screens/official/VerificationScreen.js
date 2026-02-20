import { ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useRoleBackPolicy from "../../hooks/useRoleBackPolicy";
import colors from "../../theme/colors";

const steps = [
    { id: 1, title: "GPS Check", icon: "location-outline", desc: "Verify coordinates" },
    { id: 2, title: "Field Photos", icon: "camera-outline", desc: "4 multi-angle shots" },
    { id: 3, title: "Assessment", icon: "form-outline", desc: "Crop health form" },
    { id: 4, title: "Review", icon: "checkmark-done-outline", desc: "Final submission" },
];

export default function VerificationScreen({ navigation, route }) {
    useRoleBackPolicy({ navigation, homeRoute: "OfficerHome" });
    const task = route?.params?.task;

    const startVerification = () => {
        navigation.navigate("VerificationGPS");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Verification Prep</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* FARM INFO */}
                <View style={styles.heroBox}>
                    <Ionicons name="map" size={40} color="white" style={styles.heroIcon} />
                    <View>
                        <Text style={styles.heroTitle}>Farm Verification</Text>
                        <Text style={styles.heroSub}>{task?.farmer || "Ramesh Patel"} • {task?.village || "Ramgarh"}</Text>
                    </View>
                </View>

                {/* SUMMARY CARD */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Assignment Data</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLbl}>Farm ID</Text>
                        <Text style={styles.infoVal}>#{task?.id || "A123"}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLbl}>Expected Crop</Text>
                        <Text style={styles.infoVal}>{task?.crop || "Rice"}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLbl}>Deadline</Text>
                        <Text style={[styles.infoVal, { color: colors.danger }]}>{task?.deadline || "Today, 4 PM"}</Text>
                    </View>
                </View>

                {/* STEPS */}
                <Text style={styles.sectionTitle}>Workflow Steps</Text>
                <View style={styles.stepsContainer}>
                    {steps.map((step, idx) => (
                        <View key={step.id} style={styles.stepItem}>
                            <View style={styles.stepMarker}>
                                <View style={styles.stepLine} />
                                <View style={styles.stepCircle}>
                                    <Text style={styles.stepNum}>{step.id}</Text>
                                </View>
                                {idx < steps.length - 1 && <View style={styles.stepLine} />}
                            </View>
                            <View style={styles.stepContent}>
                                <View style={styles.stepIconWrap}>
                                    <Ionicons name={step.icon} size={20} color={colors.primary} />
                                </View>
                                <View>
                                    <Text style={styles.stepTitle}>{step.title}</Text>
                                    <Text style={styles.stepDesc}>{step.desc}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* ALERT */}
                <View style={styles.tipBox}>
                    <Ionicons name="bulb" size={20} color="#F57C00" />
                    <Text style={styles.tipText}>
                        Ensure you are physically present at the farm before starting GPS verification.
                    </Text>
                </View>

                <TouchableOpacity style={styles.primaryBtn} onPress={startVerification}>
                    <Text style={styles.primaryBtnText}>Initiate Verification</Text>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.secondaryBtnText}>Cancel and Exit</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
        backgroundColor: colors.primary,
        height: 70,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    headerTitle: { color: "white", fontSize: 20, fontWeight: "bold", marginLeft: 15 },
    backBtn: { padding: 5 },

    scroll: { padding: 20 },

    heroBox: {
        backgroundColor: colors.primary,
        padding: 24,
        borderRadius: 24,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
        elevation: 6,
    },
    heroIcon: { marginRight: 20 },
    heroTitle: { color: "white", fontSize: 22, fontWeight: "bold" },
    heroSub: { color: "white", opacity: 0.8, fontSize: 13, marginTop: 4 },

    card: { backgroundColor: "white", borderRadius: 24, padding: 20, marginBottom: 25, elevation: 4 },
    cardTitle: { fontSize: 18, fontWeight: "bold", color: colors.text, marginBottom: 15 },
    infoRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
    infoLbl: { fontSize: 14, color: colors.textSecondary },
    infoVal: { fontSize: 15, fontWeight: "700", color: colors.text },

    sectionTitle: { fontSize: 18, fontWeight: "bold", color: colors.text, marginBottom: 15 },

    stepsContainer: { paddingLeft: 10 },
    stepItem: { flexDirection: "row" },
    stepMarker: { alignItems: "center", marginRight: 20 },
    stepCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primary, justifyContent: "center", alignItems: "center", zIndex: 1 },
    stepNum: { color: "white", fontSize: 12, fontWeight: "bold" },
    stepLine: { width: 2, height: 20, backgroundColor: colors.border },

    stepContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        elevation: 2,
    },
    stepIconWrap: { width: 40, height: 40, borderRadius: 10, backgroundColor: colors.primary + "10", justifyContent: "center", alignItems: "center", marginRight: 15 },
    stepTitle: { fontSize: 15, fontWeight: "bold", color: colors.text },
    stepDesc: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },

    tipBox: {
        flexDirection: "row",
        backgroundColor: "#FFF8E1",
        padding: 16,
        borderRadius: 15,
        alignItems: "center",
        marginBottom: 25,
        gap: 12,
    },
    tipText: { flex: 1, fontSize: 13, color: "#BF360C", fontWeight: "600" },

    primaryBtn: {
        backgroundColor: colors.primary,
        padding: 18,
        borderRadius: 18,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        elevation: 5,
    },
    primaryBtnText: { color: "white", fontSize: 18, fontWeight: "bold" },

    secondaryBtn: {
        padding: 18,
        borderRadius: 18,
        alignItems: "center",
        marginTop: 10,
    },
    secondaryBtnText: { color: colors.textSecondary, fontWeight: "bold" },
});
