import { ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useRoleBackPolicy from "../../hooks/useRoleBackPolicy";
import colors from "../../theme/colors";

const stats = [
    { key: "total", label: "Visits", value: "5", color: "#1976D2" },
    { key: "completed", label: "Done", value: "3", color: colors.success },
    { key: "progress", label: "Active", value: "1", color: colors.accent },
];

const visits = [
    {
        id: "RPT-001",
        farmer: "Ramesh Kumar",
        cropVillage: "Paddy • Ramgarh, RJ",
        date: "Today, 11:30 AM",
        damage: "Low",
        aiMatch: "Yes",
        status: "Completed",
    },
    {
        id: "RPT-002",
        farmer: "Suresh Patel",
        cropVillage: "Wheat • Sohna, RJ",
        date: "Yesterday, 2:45 PM",
        damage: "High",
        aiMatch: "No",
        status: "Completed",
    },
];

export default function ReportsScreen({ navigation }) {
    useRoleBackPolicy({ navigation, homeRoute: "OfficerHome" });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Visit Reports</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* STATS */}
                <View style={styles.statsContainer}>
                    {stats.map(item => (
                        <View key={item.key} style={styles.statItem}>
                            <Text style={[styles.statVal, { color: item.color }]}>{item.value}</Text>
                            <Text style={styles.statLbl}>{item.label}</Text>
                        </View>
                    ))}
                </View>

                {/* VISITS */}
                <Text style={styles.sectionTitle}>Recent Logs</Text>
                {visits.map((visit) => (
                    <TouchableOpacity key={visit.id} style={styles.card} activeOpacity={0.9}>
                        <View style={styles.cardHeader}>
                            <View style={styles.avatar}>
                                <Ionicons name="person" size={20} color={colors.primary} />
                            </View>
                            <View style={{ flex: 1, marginLeft: 15 }}>
                                <Text style={styles.farmerName}>{visit.farmer}</Text>
                                <Text style={styles.idText}>Report ID: {visit.id}</Text>
                            </View>
                            <View style={styles.statusBadge}>
                                <Ionicons name="checkmark-circle" size={14} color={colors.success} />
                                <Text style={styles.statusText}>{visit.status}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.detailsGrid}>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLbl}>Crop & Village</Text>
                                <Text style={styles.detailVal}>{visit.cropVillage}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLbl}>Damage Level</Text>
                                <Text style={[styles.detailVal, { color: visit.damage === "High" ? colors.danger : colors.success }]}>
                                    {visit.damage}
                                </Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLbl}>AI Mismatch</Text>
                                <Text style={[styles.detailVal, { color: visit.aiMatch === "No" ? colors.danger : colors.success }]}>
                                    {visit.aiMatch === "No" ? "Found" : "None"}
                                </Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLbl}>Date</Text>
                                <Text style={styles.detailVal}>{visit.date}</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.viewReportBtn}>
                            <Text style={styles.viewReportText}>View Compliance Report</Text>
                            <Ionicons name="document-text-outline" size={16} color={colors.primary} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
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

    statsContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 24,
        padding: 20,
        elevation: 4,
        justifyContent: "space-around",
        marginBottom: 30,
    },
    statItem: { alignItems: "center" },
    statVal: { fontSize: 22, fontWeight: "bold" },
    statLbl: { fontSize: 12, color: colors.textSecondary },

    sectionTitle: { fontSize: 18, fontWeight: "bold", color: colors.text, marginBottom: 15 },

    card: { backgroundColor: "white", borderRadius: 24, padding: 20, marginBottom: 20, elevation: 4 },
    cardHeader: { flexDirection: "row", alignItems: "center" },
    avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary + "15", justifyContent: "center", alignItems: "center" },
    farmerName: { fontSize: 16, fontWeight: "bold", color: colors.text },
    idText: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
    statusBadge: { flexDirection: "row", alignItems: "center", backgroundColor: colors.success + "15", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, gap: 5 },
    statusText: { fontSize: 12, fontWeight: "bold", color: colors.success },

    divider: { height: 1, backgroundColor: colors.border, marginVertical: 15, opacity: 0.5 },

    detailsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 15 },
    detailItem: { width: "45%" },
    detailLbl: { fontSize: 11, color: colors.textSecondary },
    detailVal: { fontSize: 14, fontWeight: "700", color: colors.text, marginTop: 2 },

    viewReportBtn: {
        backgroundColor: "#F9FBFA",
        borderWidth: 1,
        borderColor: colors.border,
        padding: 12,
        borderRadius: 15,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
        gap: 8,
    },
    viewReportText: { color: colors.primary, fontWeight: "bold", fontSize: 14 },
});
