import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const stats = [
    { key: "total", label: "Total Visits", value: "5", icon: "document-text", color: "#67b46f" },
    { key: "completed", label: "Completed", value: "3", icon: "checkmark-done", color: "#08b30f" },
    { key: "progress", label: "In Progress", value: "1", icon: "time", color: "#1d74d6" },
    { key: "scheduled", label: "Scheduled", value: "1", icon: "calendar", color: "#f3a51d" },
];

const visits = [
    {
        id: "RPT-001",
        farmer: "Ramesh Kumar",
        cropVillage: "Paddy • Chengalpattu, TN",
        date: "Today, 11:30 AM",
        damage: "Low",
        aiMatch: "Yes",
        type: "Scheduled",
        status: "Completed",
        damageColor: "#0aa53d",
        aiColor: "#0aa53d",
    },
    {
        id: "RPT-002",
        farmer: "Suresh Patel",
        cropVillage: "Wheat • Kanchipuram, TN",
        date: "Yesterday, 2:45 PM",
        damage: "High",
        aiMatch: "No",
        type: "Emergency",
        status: "Completed",
        damageColor: "#f09a19",
        aiColor: "#f09a19",
    },
];

export default function ReportsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.topBarTitle}>Visit History</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.headerBar}>
                    <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={() => navigation.navigate("OfficerHome")}
                    >
                        <Ionicons name="arrow-back" size={24} color="#11381a" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Visit History</Text>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Ionicons name="filter" size={22} color="#11381a" />
                    </TouchableOpacity>
                </View>

                <View style={styles.statsCard}>
                    {stats.map((item) => (
                        <View key={item.key} style={styles.statItem}>
                            <View style={[styles.statIconWrap, { backgroundColor: item.color }]}>
                                <Ionicons name={item.icon} size={16} color="#fff" />
                            </View>
                            <Text style={styles.statValue}>{item.value}</Text>
                            <Text style={styles.statLabel}>{item.label}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.tabsRow}>
                    <View style={[styles.tabLine, styles.tabActive]} />
                    <View style={styles.tabLine} />
                    <View style={styles.tabLine} />
                    <View style={styles.tabLine} />
                </View>

                {visits.map((visit, index) => (
                    <View key={visit.id} style={[styles.visitCard, index > 0 && styles.visitGap]}>
                        <View style={styles.visitTop}>
                            <Text style={styles.reportId}>
                                <Ionicons name="document-text" size={14} color="#6e777d" /> {visit.id}
                            </Text>
                            <View style={styles.completedPill}>
                                <Ionicons name="checkmark-circle" size={14} color="#0aa53d" />
                                <Text style={styles.completedText}>{visit.status}</Text>
                            </View>
                        </View>

                        <View style={styles.farmerRow}>
                            <View style={styles.avatar}>
                                <Ionicons name="person" size={18} color="#41a95b" />
                            </View>
                            <View>
                                <Text style={styles.farmerName}>{visit.farmer}</Text>
                                <Text style={styles.farmerMeta}>{visit.cropVillage}</Text>
                            </View>
                        </View>

                        <View style={styles.metricGrid}>
                            <View style={styles.metricBox}>
                                <Ionicons name="calendar" size={14} color="#55616a" />
                                <Text style={styles.metricLabel}>Date</Text>
                                <Text style={styles.metricValue}>{visit.date}</Text>
                            </View>
                            <View style={styles.metricBox}>
                                <Ionicons name="analytics" size={14} color="#55616a" />
                                <Text style={styles.metricLabel}>Damage</Text>
                                <Text style={[styles.metricValue, { color: visit.damageColor }]}>
                                    {visit.damage}
                                </Text>
                            </View>
                            <View style={styles.metricBox}>
                                <Ionicons name="git-compare" size={14} color="#55616a" />
                                <Text style={styles.metricLabel}>AI Match</Text>
                                <Text style={[styles.metricValue, { color: visit.aiColor }]}>
                                    {visit.aiMatch}
                                </Text>
                            </View>
                            <View style={styles.metricBox}>
                                <Ionicons name="walk" size={14} color="#55616a" />
                                <Text style={styles.metricLabel}>Type</Text>
                                <Text style={styles.metricValue}>{visit.type}</Text>
                            </View>
                        </View>

                        <Text style={styles.photosTitle}>Field Photos:</Text>
                        <View style={styles.photoRow}>
                            <View style={styles.photoPlaceholder} />
                            <View style={styles.photoPlaceholder} />
                            <View style={styles.photoPlaceholder} />
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#edf2ec",
    },
    topBar: {
        height: 70,
        justifyContent: "center",
        paddingHorizontal: 16,
        backgroundColor: "#38a753",
    },
    topBarTitle: {
        fontSize: 34,
        fontWeight: "700",
        color: "#fff",
    },
    content: {
        paddingBottom: 24,
    },
    headerBar: {
        marginTop: 12,
        backgroundColor: "#fff",
        borderRadius: 16,
        marginHorizontal: 10,
        minHeight: 64,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    iconBtn: {
        width: 34,
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#0f3318",
    },
    statsCard: {
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: "#fff",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#e0e7df",
        flexDirection: "row",
        paddingVertical: 14,
    },
    statItem: {
        width: "25%",
        alignItems: "center",
    },
    statIconWrap: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: "center",
        justifyContent: "center",
    },
    statValue: {
        marginTop: 8,
        fontSize: 34,
        color: "#082812",
        fontWeight: "800",
    },
    statLabel: {
        marginTop: 2,
        fontSize: 14,
        color: "#5d6870",
    },
    tabsRow: {
        marginTop: 10,
        marginHorizontal: 10,
        flexDirection: "row",
        gap: 14,
    },
    tabLine: {
        width: 72,
        height: 2,
        backgroundColor: "#cfd6cf",
    },
    tabActive: {
        backgroundColor: "#38a753",
    },
    visitCard: {
        marginTop: 8,
        marginHorizontal: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#dbe1db",
        backgroundColor: "#fff",
        padding: 14,
    },
    visitGap: {
        marginTop: 14,
    },
    visitTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    reportId: {
        color: "#6d767c",
        fontSize: 14,
    },
    completedPill: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "#dff4df",
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    completedText: {
        color: "#0aa53d",
        fontSize: 14,
        fontWeight: "700",
    },
    farmerRow: {
        marginTop: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#d8eee0",
        alignItems: "center",
        justifyContent: "center",
    },
    farmerName: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f2f14",
    },
    farmerMeta: {
        marginTop: 2,
        fontSize: 14,
        color: "#5f6971",
    },
    metricGrid: {
        marginTop: 14,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    metricBox: {
        width: "48.5%",
        minHeight: 82,
        borderRadius: 10,
        backgroundColor: "#edf2ec",
        alignItems: "center",
        justifyContent: "center",
    },
    metricLabel: {
        marginTop: 4,
        fontSize: 13,
        color: "#6a757d",
    },
    metricValue: {
        marginTop: 2,
        fontSize: 16,
        color: "#0f2328",
        fontWeight: "700",
    },
    photosTitle: {
        marginTop: 14,
        fontSize: 16,
        fontWeight: "600",
        color: "#4e5962",
    },
    photoRow: {
        marginTop: 8,
        flexDirection: "row",
        gap: 8,
    },
    photoPlaceholder: {
        width: 42,
        height: 42,
        borderRadius: 6,
        backgroundColor: "#b8d8ea",
    },
});
