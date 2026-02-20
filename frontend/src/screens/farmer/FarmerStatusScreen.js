import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import useRoleBackPolicy from "../../hooks/useRoleBackPolicy";
import colors from "../../theme/colors";

const summary = [
    { key: "active", value: "3", label: "Active", icon: "cloud-upload", color: colors.primary },
    { key: "approved", value: "1", label: "Approved", icon: "checkmark-circle", color: colors.success },
    { key: "processing", value: "2", label: "Processing", icon: "time", color: colors.accent },
];

const cards = [
    {
        id: "SUB230115001",
        crop: "Paddy (Rice)",
        stage: "Flowering Stage",
        date: "Jan 15, 2024",
        status: "Approved",
        statusColor: colors.success,
        timeline: [
            { title: "Submitted", time: "10:30 AM", done: true },
            { title: "AI Analysis", time: "10:45 AM", done: true },
            { title: "Verification", time: "11:30 AM", done: true },
            { title: "Approved", time: "2:00 PM", done: true },
        ],
    },
    {
        id: "SUB230116002",
        crop: "Wheat",
        stage: "Vegetative Stage",
        date: "Jan 16, 2024",
        status: "Processing",
        statusColor: colors.accent,
        timeline: [
            { title: "Submitted", time: "3:15 PM", done: true },
            { title: "AI Analysis", time: "3:30 PM", done: true },
            { title: "Verification", time: "Processing", done: false },
            { title: "Approval", time: "Pending", done: false },
        ],
    },
];

export default function FarmerStatusScreen({ navigation }) {
    useRoleBackPolicy({ navigation, homeRoute: "Home" });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Claim Status</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* SUMMARY STATS */}
                <View style={styles.summaryContainer}>
                    {summary.map((item) => (
                        <View key={item.key} style={styles.summaryItem}>
                            <View style={[styles.summaryIcon, { backgroundColor: item.color + "15" }]}>
                                <Ionicons name={item.icon} size={22} color={item.color} />
                            </View>
                            <Text style={styles.summaryVal}>{item.value}</Text>
                            <Text style={styles.summaryLbl}>{item.label}</Text>
                        </View>
                    ))}
                </View>

                {/* TRACKING CARDS */}
                <Text style={styles.sectionTitle}>Active Tracking</Text>
                {cards.map((card) => (
                    <View key={card.id} style={styles.statusCard}>
                        <View style={styles.cardHeader}>
                            <View>
                                <Text style={styles.cropTitle}>{card.crop}</Text>
                                <Text style={styles.idText}>ID: {card.id}</Text>
                            </View>
                            <View style={[styles.statusBadge, { backgroundColor: card.statusColor + "15" }]}>
                                <Text style={[styles.statusText, { color: card.statusColor }]}>{card.status}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.timeline}>
                            {card.timeline.map((step, index) => (
                                <View key={index} style={styles.timelineItem}>
                                    <View style={styles.timelineMarker}>
                                        <View style={[styles.timelineDot, step.done ? styles.dotActive : styles.dotInactive]}>
                                            {step.done && <Ionicons name="checkmark" size={10} color="white" />}
                                        </View>
                                        {index < card.timeline.length - 1 && (
                                            <View style={[styles.timelineLine, step.done ? styles.lineActive : styles.lineInactive]} />
                                        )}
                                    </View>
                                    <View style={styles.timelineContent}>
                                        <Text style={[styles.stepTitle, step.done ? styles.stepActive : styles.stepInactive]}>
                                            {step.title}
                                        </Text>
                                        <Text style={styles.stepTime}>{step.time}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity style={styles.detailsBtn}>
                            <Text style={styles.detailsBtnText}>View Full Details</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.fab}>
                <Ionicons name="camera" size={28} color="white" />
            </TouchableOpacity>
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
    content: { padding: 20, paddingBottom: 100 },

    summaryContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 24,
        padding: 20,
        elevation: 4,
        justifyContent: "space-around",
        marginBottom: 30,
    },
    summaryItem: { alignItems: "center" },
    summaryIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: "center", alignItems: "center", marginBottom: 8 },
    summaryVal: { fontSize: 18, fontWeight: "bold", color: colors.text },
    summaryLbl: { fontSize: 12, color: colors.textSecondary },

    sectionTitle: { fontSize: 18, fontWeight: "bold", color: colors.text, marginBottom: 15 },

    statusCard: { backgroundColor: "white", borderRadius: 24, padding: 20, marginBottom: 20, elevation: 4 },
    cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
    cropTitle: { fontSize: 18, fontWeight: "bold", color: colors.text },
    idText: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
    statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    statusText: { fontSize: 12, fontWeight: "bold" },

    divider: { height: 1, backgroundColor: colors.border, marginVertical: 15, opacity: 0.5 },

    timeline: { marginTop: 5 },
    timelineItem: { flexDirection: "row", minHeight: 50 },
    timelineMarker: { alignItems: "center", marginRight: 15 },
    timelineDot: { width: 18, height: 18, borderRadius: 9, justifyContent: "center", alignItems: "center" },
    dotActive: { backgroundColor: colors.primary },
    dotInactive: { backgroundColor: colors.border, borderWidth: 1, borderColor: colors.textSecondary + "30" },
    timelineLine: { width: 2, flex: 1, marginVertical: 2 },
    lineActive: { backgroundColor: colors.primary },
    lineInactive: { backgroundColor: colors.border },

    timelineContent: { flex: 1, paddingBottom: 15 },
    stepTitle: { fontSize: 15, fontWeight: "bold" },
    stepActive: { color: colors.text },
    stepInactive: { color: colors.textSecondary },
    stepTime: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },

    detailsBtn: {
        backgroundColor: "#F9FBFA",
        borderWidth: 1,
        borderColor: colors.border,
        padding: 12,
        borderRadius: 15,
        alignItems: "center",
        marginTop: 10,
    },
    detailsBtnText: { color: colors.primary, fontWeight: "bold", fontSize: 14 },

    fab: {
        position: "absolute",
        bottom: 30,
        right: 30,
        backgroundColor: colors.primary,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 8,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    }
});
