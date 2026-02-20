import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import useRoleBackPolicy from "../../hooks/useRoleBackPolicy";
import colors from "../../theme/colors";

export default function FarmDetailsScreen({ navigation }) {
    useRoleBackPolicy({ navigation, homeRoute: "OfficerHome" });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Farm Details</Text>
                <TouchableOpacity style={styles.headerAction}>
                    <Ionicons name="share-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* HERO CARD */}
                <View style={styles.heroCard}>
                    <View style={styles.rowBetween}>
                        <View>
                            <Text style={styles.farmId}>FARM #A123-RJ</Text>
                            <Text style={styles.farmerName}>Ramesh Patel</Text>
                        </View>
                        <View style={styles.urgentBadge}>
                            <MaterialCommunityIcons name="alert-octagon" size={16} color="white" />
                            <Text style={styles.urgentText}>URGENT</Text>
                        </View>
                    </View>

                    <View style={styles.actionRow}>
                        <ContactBtn icon="call" label="Call" color="#2E7D32" />
                        <ContactBtn icon="chatbubble" label="SMS" color="#1976D2" />
                        <ContactBtn icon="navigate" label="Route" color="#FFA000" />
                    </View>
                </View>

                {/* INFO GRID */}
                <View style={styles.gridRow}>
                    <InfoBox
                        icon="leaf"
                        title="Crop Info"
                        items={[
                            { label: "Type", value: "Rice (Basmati)" },
                            { label: "Stage", value: "Flowering" },
                            { label: "Area", value: "2.5 Acres" }
                        ]}
                    />
                    <InfoBox
                        icon="shield-check"
                        title="Insurance"
                        items={[
                            { label: "Policy", value: "#RICF-001" },
                            { label: "Status", value: "Active" },
                            { label: "Provider", value: "PMFBY" }
                        ]}
                    />
                </View>

                {/* LOCATION */}
                <View style={styles.card}>
                    <View style={styles.cardTitleRow}>
                        <Ionicons name="location" size={20} color={colors.danger} />
                        <Text style={styles.cardTitle}>Location Coordinates</Text>
                    </View>
                    <View style={styles.locBox}>
                        <View style={styles.locItem}>
                            <Text style={styles.locLabel}>Lat / Long</Text>
                            <Text style={styles.locValue}>28.4595° N, 77.0266° E</Text>
                        </View>
                        <View style={styles.locItem}>
                            <Text style={styles.locLabel}>District</Text>
                            <Text style={styles.locValue}>Ramgarh, Jaipur West</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.mapPreview}>
                        <Ionicons name="map-outline" size={30} color={colors.textSecondary} />
                        <Text style={styles.mapText}>Tap to open Google Maps</Text>
                    </TouchableOpacity>
                </View>

                {/* TIMELINE */}
                <View style={styles.card}>
                    <View style={styles.cardTitleRow}>
                        <Ionicons name="time" size={20} color={colors.accent} />
                        <Text style={styles.cardTitle}>Recent Activity</Text>
                    </View>

                    <TimelineStep
                        date="Jan 10"
                        title="Images Uploaded"
                        desc="Farmer submitted 5 photos from vegetative stage."
                        completed
                    />
                    <TimelineStep
                        date="Jan 12"
                        title="AI Flagged"
                        desc="AI detected low nitrogen stress in sector B."
                        completed
                    />
                    <TimelineStep
                        date="Today"
                        title="Field Audit"
                        desc="Scheduled for officer physical verification."
                        active
                        last
                    />
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            <View style={styles.dock}>
                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => navigation.navigate("Verify")}
                >
                    <Text style={styles.primaryBtnText}>Start Verification Flow</Text>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const ContactBtn = ({ icon, label, color }) => (
    <TouchableOpacity style={styles.contactBtn}>
        <View style={[styles.contactIcon, { backgroundColor: color + "15" }]}>
            <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={styles.contactLabel}>{label}</Text>
    </TouchableOpacity>
);

const InfoBox = ({ icon, title, items }) => (
    <View style={styles.infoBox}>
        <View style={styles.infoHead}>
            <MaterialCommunityIcons name={icon} size={18} color={colors.primary} />
            <Text style={styles.infoTitle}>{title}</Text>
        </View>
        {items.map((it, i) => (
            <View key={i} style={styles.infoItem}>
                <Text style={styles.infoLabel}>{it.label}</Text>
                <Text style={styles.infoValue}>{it.value}</Text>
            </View>
        ))}
    </View>
);

const TimelineStep = ({ date, title, desc, completed, active, last }) => (
    <View style={styles.tlRow}>
        <View style={styles.tlLeft}>
            <View style={[styles.tlDot, completed && { backgroundColor: colors.success }, active && { backgroundColor: colors.accent }]} />
            {!last && <View style={styles.tlLine} />}
        </View>
        <View style={styles.tlRight}>
            <Text style={styles.tlDate}>{date}</Text>
            <Text style={styles.tlTitle}>{title}</Text>
            <Text style={styles.tlDesc}>{desc}</Text>
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
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    headerTitle: { color: "white", fontSize: 20, fontWeight: "bold" },
    backBtn: { padding: 5 },
    headerAction: { padding: 5 },

    content: { padding: 18 },
    heroCard: {
        backgroundColor: "white",
        borderRadius: 24,
        padding: 24,
        elevation: 8,
        marginBottom: 20,
    },
    rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
    farmId: { fontSize: 13, color: colors.textSecondary, fontWeight: "bold" },
    farmerName: { fontSize: 26, fontWeight: "bold", color: colors.text, marginTop: 4 },
    urgentBadge: {
        backgroundColor: colors.danger,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        gap: 5
    },
    urgentText: { color: "white", fontSize: 10, fontWeight: "bold" },

    actionRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 25, borderTopWidth: 1, borderTopColor: "#F0F0F0", paddingTop: 20 },
    contactBtn: { alignItems: "center", flex: 1 },
    contactIcon: { width: 44, height: 44, borderRadius: 15, justifyContent: "center", alignItems: "center", marginBottom: 6 },
    contactLabel: { fontSize: 12, color: colors.textSecondary, fontWeight: "600" },

    gridRow: { flexDirection: "row", gap: 12, marginBottom: 20 },
    infoBox: { flex: 1, backgroundColor: "white", borderRadius: 20, padding: 16, elevation: 3 },
    infoHead: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
    infoTitle: { fontSize: 14, fontWeight: "bold", color: colors.text },
    infoItem: { marginBottom: 8 },
    infoLabel: { fontSize: 10, color: colors.textSecondary, textTransform: "uppercase" },
    infoValue: { fontSize: 13, fontWeight: "bold", color: colors.text, marginTop: 1 },

    card: { backgroundColor: "white", borderRadius: 24, padding: 20, marginBottom: 20, elevation: 4 },
    cardTitleRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 15 },
    cardTitle: { fontSize: 16, fontWeight: "bold", color: colors.text },
    locBox: { flexDirection: "row", gap: 20, marginBottom: 15 },
    locLabel: { fontSize: 11, color: colors.textSecondary },
    locValue: { fontSize: 14, fontWeight: "bold", color: colors.text, marginTop: 2 },
    mapPreview: { height: 60, backgroundColor: colors.background, borderRadius: 15, borderStyle: "dashed", borderWidth: 1, borderColor: colors.border, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 },
    mapText: { fontSize: 13, color: colors.textSecondary, fontWeight: "600" },

    tlRow: { flexDirection: "row", minHeight: 70 },
    tlLeft: { alignItems: "center", width: 24 },
    tlDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#E0E0E0", zIndex: 1, marginTop: 5 },
    tlLine: { width: 2, flex: 1, backgroundColor: "#F0F0F0", marginVertical: 2 },
    tlRight: { flex: 1, marginLeft: 15, paddingBottom: 20 },
    tlDate: { fontSize: 11, fontWeight: "bold", color: colors.textSecondary },
    tlTitle: { fontSize: 15, fontWeight: "bold", color: colors.text, marginTop: 2 },
    tlDesc: { fontSize: 12, color: colors.textSecondary, marginTop: 4, lineHeight: 18 },

    dock: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 25, paddingBottom: 40, backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 30, elevation: 20 },
    primaryBtn: { backgroundColor: colors.primary, padding: 18, borderRadius: 18, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 12, elevation: 5 },
    primaryBtnText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
