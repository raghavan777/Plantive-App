import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import useRoleBackPolicy from "../../hooks/useRoleBackPolicy";
import colors from "../../theme/colors";

export default function VerificationGpsScreen({ navigation }) {
    useRoleBackPolicy({ navigation, homeRoute: "OfficerHome" });
    const distance = 12; // Example: 12 meters
    const canProceed = distance <= 100;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Position Check</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.card}>
                    <View style={[styles.statusOrbit, { borderColor: canProceed ? colors.success + "30" : colors.danger + "30" }]}>
                        <View style={[styles.statusCore, { backgroundColor: canProceed ? colors.success : colors.danger }]}>
                            <Ionicons name={canProceed ? "location" : "location-outline"} size={45} color="white" />
                        </View>
                        {/* Orbiting dots for visual flair */}
                        <View style={[styles.orbitDot, { top: "10%", left: "10%" }]} />
                        <View style={[styles.orbitDot, { bottom: "15%", right: "20%" }]} />
                    </View>

                    <Text style={styles.statusTitle}>{canProceed ? "Verified Location" : "Out of Range"}</Text>
                    <Text style={styles.statusSub}>
                        {canProceed
                            ? "You are accurately positioned at the farm site."
                            : `You are too far from the designated farm coordinates.`}
                    </Text>

                    <View style={styles.distanceBox}>
                        <Text style={styles.distanceLabel}>DISTANCE</Text>
                        <Text style={[styles.distanceValue, { color: canProceed ? colors.success : colors.danger }]}>
                            {distance} <Text style={{ fontSize: 18 }}>meters</Text>
                        </Text>
                    </View>
                </View>

                {/* LOCATIONS */}
                <View style={styles.locCard}>
                    <LocRow
                        icon="flag-variant"
                        label="Target Coordinates"
                        value="13.0827, 80.2707"
                    />
                    <View style={styles.divider} />
                    <LocRow
                        icon="account-location"
                        label="Current Position"
                        value="12.9842, 80.1934"
                    />
                </View>

                <TouchableOpacity style={styles.refreshBtn}>
                    <MaterialCommunityIcons name="refresh" size={20} color={colors.primary} />
                    <Text style={styles.refreshText}>re-scan position</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.dock}>
                <TouchableOpacity
                    style={[styles.primaryBtn, !canProceed && styles.btnDisabled]}
                    onPress={() => navigation.navigate("VerificationCamera")}
                    disabled={!canProceed}
                >
                    <Text style={styles.primaryBtnText}>Continue to Camera</Text>
                    <Ionicons name="camera" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const LocRow = ({ icon, label, value }) => (
    <View style={styles.locRow}>
        <MaterialCommunityIcons name={icon} size={22} color={colors.primary} />
        <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.locLabel}>{label}</Text>
            <Text style={styles.locValue}>{value}</Text>
        </View>
    </View>
);

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

    content: { flex: 1, padding: 25, alignItems: "center" },
    card: { backgroundColor: "white", borderRadius: 30, padding: 30, width: "100%", alignItems: "center", elevation: 8, marginBottom: 20 },

    statusOrbit: { width: 150, height: 150, borderRadius: 75, borderWidth: 2, justifyContent: "center", alignItems: "center", marginBottom: 25 },
    statusCore: { width: 100, height: 100, borderRadius: 50, justifyContent: "center", alignItems: "center", elevation: 10 },
    orbitDot: { position: "absolute", width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary + "50" },

    statusTitle: { fontSize: 24, fontWeight: "bold", color: colors.text },
    statusSub: { fontSize: 13, color: colors.textSecondary, textAlign: "center", marginTop: 8, lineHeight: 18 },

    distanceBox: { marginTop: 25, alignItems: "center" },
    distanceLabel: { fontSize: 10, fontWeight: "bold", color: colors.textSecondary, letterSpacing: 1 },
    distanceValue: { fontSize: 36, fontWeight: "bold", marginTop: 5 },

    locCard: { backgroundColor: "white", borderRadius: 24, padding: 20, width: "100%", elevation: 4 },
    locRow: { flexDirection: "row", alignItems: "center" },
    locLabel: { fontSize: 11, color: colors.textSecondary, textTransform: "uppercase", fontWeight: "bold" },
    locValue: { fontSize: 16, color: colors.text, fontWeight: "bold", marginTop: 2 },
    divider: { height: 1, backgroundColor: "#F0F0F0", marginVertical: 15 },

    refreshBtn: { marginTop: 20, flexDirection: "row", alignItems: "center", gap: 8, padding: 10 },
    refreshText: { textTransform: "uppercase", fontWeight: "bold", color: colors.primary, fontSize: 12, letterSpacing: 1 },

    dock: { padding: 25, paddingBottom: 40, backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 30, elevation: 20 },
    primaryBtn: { backgroundColor: colors.primary, padding: 18, borderRadius: 18, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 12, elevation: 5 },
    btnDisabled: { backgroundColor: "#DDD" },
    primaryBtnText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
