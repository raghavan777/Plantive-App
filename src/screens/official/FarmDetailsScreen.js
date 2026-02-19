import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FarmDetailsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* CLEAN TOP BAR */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.topBarTitle}>Farm Details</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* HERO SECTION / FARMER INFO */}
                <View style={styles.heroCard}>
                    <View style={styles.heroHeader}>
                        <View>
                            <Text style={styles.farmId}>Farm #A123</Text>
                            <Text style={styles.farmerName}>Ramesh Patel</Text>
                        </View>
                        <View style={styles.statusBadge}>
                            <Ionicons name="alert-circle" size={16} color="#ff4444" />
                            <Text style={styles.statusText}>URGENT</Text>
                        </View>
                    </View>

                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.actionBtn}>
                            <View style={[styles.actionIcon, { backgroundColor: "#e8f5e9" }]}>
                                <Ionicons name="call" size={20} color="#2e7d32" />
                            </View>
                            <Text style={styles.actionLabel}>Call Farmer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionBtn}>
                            <View style={[styles.actionIcon, { backgroundColor: "#e3f2fd" }]}>
                                <Ionicons name="navigate" size={20} color="#1976d2" />
                            </View>
                            <Text style={styles.actionLabel}>Directions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionBtn}>
                            <View style={[styles.actionIcon, { backgroundColor: "#fff3e0" }]}>
                                <Ionicons name="chatbubble" size={20} color="#f57c00" />
                            </View>
                            <Text style={styles.actionLabel}>Message</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* CROP & INSURANCE GRID */}
                <View style={styles.sectionRow}>
                    <InfoCard
                        icon="leaf"
                        color="#2e7d32"
                        title="Crop Details"
                        data={[
                            { label: "Type", value: "Rice" },
                            { label: "Stage", value: "Flowering" },
                            { label: "Area", value: "2.5 Acres" },
                        ]}
                    />
                    <InfoCard
                        icon="shield-checkmark"
                        color="#1976d2"
                        title="Insurance"
                        data={[
                            { label: "Policy", value: "#RICF-001" },
                            { label: "Provider", value: "PMFBY" },
                            { label: "Status", value: "Covered" },
                        ]}
                    />
                </View>

                {/* LOCATION CARD */}
                <View style={styles.standardCard}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="location" size={20} color="#d32f2f" />
                        <Text style={styles.cardTitle}>Location Details</Text>
                    </View>
                    <View style={styles.locationBody}>
                        <View style={styles.locItem}>
                            <Text style={styles.locLabel}>Village</Text>
                            <Text style={styles.locValue}>Ramgarh Village, Chennai South</Text>
                        </View>
                        <View style={styles.locItem}>
                            <Text style={styles.locLabel}>Coordinates</Text>
                            <Text style={styles.locValue}>28.4595° N, 77.0266° E</Text>
                        </View>
                    </View>
                </View>

                {/* TIMELINE */}
                <View style={[styles.standardCard, { paddingBottom: 20 }]}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="time" size={20} color="#f57c00" />
                        <Text style={styles.cardTitle}>Verification Timeline</Text>
                    </View>

                    <TimelineStep
                        date="Jan 10, 2024"
                        title="Initial Submission"
                        desc="Farmer uploaded first set of images"
                        status="completed"
                    />
                    <TimelineStep
                        date="Jan 12, 2024"
                        title="AI Risk Assessment"
                        desc="AI flagged potential pest infestation (Medium Risk)"
                        status="completed"
                    />
                    <TimelineStep
                        date="Today, 4:00 PM"
                        title="Field Verification"
                        desc="Physical inspection required immediately"
                        status="active"
                        isLast
                    />
                </View>

                {/* PRIMARY ACTION */}
                <TouchableOpacity
                    style={styles.mainStartBtn}
                    onPress={() => navigation.navigate("Verify")}
                >
                    <Text style={styles.mainStartBtnText}>Start Field Verification</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

function InfoCard({ icon, color, title, data }) {
    return (
        <View style={styles.gridCard}>
            <View style={styles.gridHeader}>
                <Ionicons name={icon} size={18} color={color} />
                <Text style={styles.gridTitle}>{title}</Text>
            </View>
            {data.map((item, idx) => (
                <View key={idx} style={styles.gridRow}>
                    <Text style={styles.gridLabel}>{item.label}</Text>
                    <Text style={styles.gridValue}>{item.value}</Text>
                </View>
            ))}
        </View>
    );
}

function TimelineStep({ date, title, desc, status, isLast }) {
    return (
        <View style={styles.tlStep}>
            <View style={styles.tlLeft}>
                <View style={[styles.tlDot, status === 'completed' ? styles.tlDotDone : styles.tlDotActive]} />
                {!isLast && <View style={styles.tlLine} />}
            </View>
            <View style={styles.tlRight}>
                <Text style={styles.tlDate}>{date}</Text>
                <Text style={styles.tlTitle}>{title}</Text>
                <Text style={styles.tlDesc}>{desc}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8faf9",
    },
    topBar: {
        height: 80,
        backgroundColor: "#2e7d32",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    topBarTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
    backBtn: {
        padding: 4,
    },
    content: {
        paddingBottom: 40,
    },
    heroCard: {
        backgroundColor: "#fff",
        margin: 16,
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    heroHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    farmId: {
        fontSize: 14,
        color: "#888",
        fontWeight: "600",
    },
    farmerName: {
        fontSize: 26,
        fontWeight: "800",
        color: "#1a1a1a",
        marginTop: 2,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff1f1",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        gap: 4,
    },
    statusText: {
        color: "#ff4444",
        fontSize: 12,
        fontWeight: "700",
    },
    actionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#f0f0f0",
        paddingTop: 16,
    },
    actionBtn: {
        alignItems: "center",
        flex: 1,
    },
    actionIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 6,
    },
    actionLabel: {
        fontSize: 12,
        color: "#555",
        fontWeight: "500",
    },
    sectionRow: {
        flexDirection: "row",
        paddingHorizontal: 16,
        gap: 12,
    },
    gridCard: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        elevation: 2,
    },
    gridHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },
    gridTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#333",
    },
    gridRow: {
        marginBottom: 8,
    },
    gridLabel: {
        fontSize: 11,
        color: "#999",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    gridValue: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1a1a1a",
        marginTop: 1,
    },
    standardCard: {
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginVertical: 6,
        borderRadius: 16,
        padding: 16,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1a1a1a",
    },
    locationBody: {
        gap: 12,
    },
    locItem: {},
    locLabel: {
        fontSize: 12,
        color: "#888",
    },
    locValue: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1a1a1a",
        marginTop: 2,
    },
    tlStep: {
        flexDirection: "row",
        minHeight: 60,
    },
    tlLeft: {
        width: 30,
        alignItems: "center",
    },
    tlDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        zIndex: 2,
        marginTop: 4,
    },
    tlDotDone: {
        backgroundColor: "#4caf50",
    },
    tlDotActive: {
        backgroundColor: "#ff9800",
        borderWidth: 2,
        borderColor: "#fff3e0",
    },
    tlLine: {
        width: 2,
        flex: 1,
        backgroundColor: "#eee",
        marginVertical: 2,
    },
    tlRight: {
        flex: 1,
        paddingBottom: 20,
        paddingLeft: 10,
    },
    tlDate: {
        fontSize: 11,
        color: "#999",
        fontWeight: "600",
    },
    tlTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#333",
        marginTop: 2,
    },
    tlDesc: {
        fontSize: 13,
        color: "#666",
        marginTop: 4,
        lineHeight: 18,
    },
    mainStartBtn: {
        backgroundColor: "#2e7d32",
        margin: 16,
        marginTop: 24,
        height: 56,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        shadowColor: "#2e7d32",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    mainStartBtnText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
});
