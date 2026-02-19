import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const summary = [
    { key: "active", value: "3", label: "Active", icon: "cloud-upload", color: "#2fa64f" },
    { key: "approved", value: "1", label: "Approved", icon: "checkmark-circle", color: "#10a915" },
    { key: "processing", value: "2", label: "Processing", icon: "time", color: "#f39b08" },
];

const cards = [
    {
        id: "SUB230115001",
        crop: "Paddy (Rice)",
        stage: "Flowering Stage",
        date: "Jan 15, 2024",
        status: "Approved",
        statusColor: "#10a915",
        statusBg: "#eef9ef",
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
        statusColor: "#f39b08",
        statusBg: "#fff5e6",
        timeline: [
            { title: "Submitted", time: "3:15 PM", done: true },
            { title: "AI Analysis", time: "3:30 PM", done: true },
            { title: "Verification", time: "Processing", done: false },
            { title: "Approval", time: "Pending", done: false },
        ],
    },
];

export default function FarmerStatusScreen() {
    return (
        <View style={styles.container}>
            {/* TOP BAR */}
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>Claim Status</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* HEADER */}
                <View style={styles.headBlock}>
                    <Text style={styles.pageTitle}>Claim Status</Text>
                    <Text style={styles.pageSub}>Track your crop submissions in real-time</Text>
                </View>

                {/* STATS SUMMARY */}
                <View style={styles.summaryCard}>
                    {summary.map((item, idx) => (
                        <View key={item.key} style={styles.summaryItemWrap}>
                            <View style={styles.summaryItem}>
                                <View style={[styles.summaryIconWrap, { backgroundColor: item.color + "15" }]}>
                                    <Ionicons name={item.icon} size={24} color={item.color} />
                                </View>
                                <Text style={styles.summaryValue}>{item.value}</Text>
                                <Text style={styles.summaryLabel}>{item.label}</Text>
                            </View>
                            {idx !== summary.length - 1 ? <View style={styles.summaryDivider} /> : null}
                        </View>
                    ))}
                </View>

                {/* CLAIM CARDS */}
                {cards.map((card) => (
                    <View key={card.id} style={styles.statusCard}>
                        <View style={styles.cardTopRow}>
                            <View>
                                <Text style={styles.cropTitle}>{card.crop}</Text>
                                <Text style={styles.stageText}>{card.stage}</Text>
                            </View>
                            <View style={[styles.badge, { backgroundColor: card.statusBg }]}>
                                <Ionicons
                                    name={
                                        card.status === "Approved"
                                            ? "checkmark-circle"
                                            : "time"
                                    }
                                    size={16}
                                    color={card.statusColor}
                                />
                                <Text style={[styles.badgeText, { color: card.statusColor }]}>
                                    {card.status}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.metaRow}>
                            <View style={styles.metaItem}>
                                <Ionicons name="finger-print-outline" size={14} color="#66707a" />
                                <Text style={styles.metaText}>{card.id}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Ionicons name="calendar-outline" size={14} color="#66707a" />
                                <Text style={styles.metaText}>{card.date}</Text>
                            </View>
                        </View>

                        <View style={styles.timelineWrap}>
                            {card.timeline.map((step, index) => (
                                <View key={`${step.title}-${index}`} style={styles.timelineRow}>
                                    <View style={styles.timelineIconCol}>
                                        <View
                                            style={[
                                                styles.dot,
                                                step.done ? styles.dotDone : styles.dotPending,
                                            ]}
                                        >
                                            {step.done ? (
                                                <Ionicons name="checkmark" size={10} color="#fff" />
                                            ) : null}
                                        </View>
                                        {index !== card.timeline.length - 1 ? (
                                            <View
                                                style={[
                                                    styles.line,
                                                    step.done ? styles.lineDone : styles.linePending,
                                                ]}
                                            />
                                        ) : null}
                                    </View>
                                    <View style={styles.timelineContent}>
                                        <Text
                                            style={[
                                                styles.timelineTitle,
                                                !step.done && styles.timelineTitlePending,
                                            ]}
                                        >
                                            {step.title}
                                        </Text>
                                        <Text style={styles.timelineTime}>{step.time}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* FLOATING ACTION BUTTON */}
            <TouchableOpacity style={styles.fab}>
                <Ionicons name="add" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7faf7",
    },
    topBar: {
        backgroundColor: "#319a4e",
        height: 64,
        justifyContent: "center",
        paddingHorizontal: 16,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    topBarText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
    content: {
        paddingBottom: 100,
    },
    headBlock: {
        paddingHorizontal: 18,
        paddingTop: 20,
        paddingBottom: 16,
    },
    pageTitle: {
        fontSize: 28,
        color: "#0f2f14",
        fontWeight: "800",
    },
    pageSub: {
        marginTop: 4,
        fontSize: 15,
        color: "#677581",
        lineHeight: 20,
    },
    summaryCard: {
        marginHorizontal: 16,
        backgroundColor: "#fff",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#e1e7e1",
        flexDirection: "row",
        paddingVertical: 18,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    summaryItemWrap: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    summaryItem: {
        alignItems: "center",
        paddingHorizontal: 8,
    },
    summaryIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    summaryValue: {
        fontSize: 22,
        color: "#0f2f14",
        fontWeight: "800",
    },
    summaryLabel: {
        marginTop: 2,
        fontSize: 13,
        color: "#6b7a84",
        fontWeight: "500",
    },
    summaryDivider: {
        width: 1,
        height: "70%",
        backgroundColor: "#eee",
    },
    statusCard: {
        marginTop: 16,
        marginHorizontal: 16,
        backgroundColor: "#fff",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#e1e7e1",
        padding: 16,
    },
    cardTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    cropTitle: {
        fontSize: 20,
        color: "#12331a",
        fontWeight: "800",
    },
    stageText: {
        marginTop: 2,
        fontSize: 14,
        color: "#5d6a74",
    },
    badge: {
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        gap: 5,
    },
    badgeText: {
        fontSize: 13,
        fontWeight: "700",
    },
    metaRow: {
        marginTop: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    metaItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    metaText: {
        color: "#6c7781",
        fontSize: 13,
        fontWeight: "500",
    },
    timelineWrap: {
        marginTop: 16,
    },
    timelineRow: {
        flexDirection: "row",
    },
    timelineIconCol: {
        width: 22,
        alignItems: "center",
    },
    dot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 3,
    },
    dotDone: {
        backgroundColor: "#319a4e",
    },
    dotPending: {
        backgroundColor: "#d1d6d3",
    },
    line: {
        width: 2,
        minHeight: 28,
        marginVertical: 2,
    },
    lineDone: {
        backgroundColor: "#319a4e",
    },
    linePending: {
        backgroundColor: "#d1d6d3",
    },
    timelineContent: {
        marginLeft: 12,
        paddingBottom: 16,
    },
    timelineTitle: {
        fontSize: 15,
        color: "#17361d",
        fontWeight: "700",
    },
    timelineTitlePending: {
        color: "#7e8880",
        fontWeight: "500",
    },
    timelineTime: {
        marginTop: 2,
        fontSize: 13,
        color: "#747f87",
    },
    fab: {
        position: "absolute",
        right: 20,
        bottom: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#2fa64f",
        alignItems: "center",
        justifyContent: "center",
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});
