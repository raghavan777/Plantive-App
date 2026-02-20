import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import useRoleBackPolicy from "../../hooks/useRoleBackPolicy";
import colors from "../../theme/colors";

export default function FarmerPreviewScreen({ route, navigation }) {
    const image = route?.params?.image || null;
    const stage = route?.params?.stage || "Flowering";
    useRoleBackPolicy({ navigation, homeRoute: "Home" });

    const analysis = [
        { label: "Crop Type", value: "Paddy (Rice)", icon: "leaf", color: colors.success },
        { label: "Health", value: "Healthy", icon: "heart-pulse", color: "#E91E63" },
        { label: "Confidence", value: "94%", icon: "shield-check", color: colors.primary },
    ];

    const handleBack = () => navigation.navigate("Home");

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>AI Analysis</Text>
            </View>

            <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* IMAGE PREVIEW */}
                <View style={styles.imageCard}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.image} />
                    ) : (
                        <View style={styles.placeholder}><Ionicons name="image-outline" size={50} color={colors.border} /></View>
                    )}
                    <View style={styles.imageBadge}>
                        <Ionicons name="location" size={12} color="white" />
                        <Text style={styles.badgeText}>GPS Tagged</Text>
                    </View>
                </View>

                {/* QUICK STATS */}
                <View style={styles.statsRow}>
                    {analysis.map((item, idx) => (
                        <View key={idx} style={styles.statCard}>
                            <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />
                            <Text style={styles.statLabel}>{item.label}</Text>
                            <Text style={[styles.statValue, { color: item.color }]}>{item.value}</Text>
                        </View>
                    ))}
                </View>

                {/* STAGE INFO */}
                <View style={styles.card}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.cardTitle}>Identified Stage</Text>
                        <TouchableOpacity onPress={handleBack}>
                            <Text style={styles.editLink}>Change</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.stageBox}>
                        <MaterialCommunityIcons name="trending-up" size={24} color={colors.primary} />
                        <Text style={styles.stageText}>{stage} Stage</Text>
                    </View>
                    <Text style={styles.stageDesc}>
                        The AI has confirmed that your crop is currently in the {stage.toLowerCase()} phase.
                    </Text>
                </View>

                {/* RECOMMENDATIONS */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Care Tips</Text>
                    <TipItem text="Maintain water depth of 5-7cm" />
                    <TipItem text="Monitor for brown plant hopper" />
                    <TipItem text="Next urea dose in 10 days" />
                </View>

                <View style={{ height: 120 }} />
            </ScrollView>

            <View style={styles.dock}>
                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => navigation.navigate("Success")}
                >
                    <Text style={styles.primaryBtnText}>Submit for Claim</Text>
                    <Ionicons name="checkmark-circle" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.retakeBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.retakeText}>Retake Photo</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const TipItem = ({ text }) => (
    <View style={styles.tipRow}>
        <Ionicons name="checkmark-circle-outline" size={18} color={colors.success} />
        <Text style={styles.tipText}>{text}</Text>
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

    scroll: { padding: 20 },
    imageCard: {
        backgroundColor: "white",
        borderRadius: 24,
        overflow: "hidden",
        elevation: 10,
        marginBottom: 20,
        height: 280,
    },
    image: { width: "100%", height: "100%" },
    placeholder: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#E8F5E9" },
    imageBadge: { position: "absolute", bottom: 15, right: 15, backgroundColor: "rgba(0,0,0,0.6)", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, gap: 5 },
    badgeText: { color: "white", fontSize: 10, fontWeight: "bold" },

    statsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
    statCard: { width: "31%", backgroundColor: "white", borderRadius: 20, padding: 15, alignItems: "center", elevation: 3 },
    statLabel: { fontSize: 10, color: colors.textSecondary, marginTop: 5 },
    statValue: { fontSize: 14, fontWeight: "bold", marginTop: 2 },

    card: { backgroundColor: "white", borderRadius: 24, padding: 20, marginBottom: 20, elevation: 4 },
    rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
    cardTitle: { fontSize: 18, fontWeight: "bold", color: colors.text },
    editLink: { color: colors.primary, fontWeight: "bold", fontSize: 14 },

    stageBox: { flexDirection: "row", alignItems: "center", backgroundColor: colors.primary + "10", padding: 12, borderRadius: 15, gap: 10 },
    stageText: { fontSize: 16, fontWeight: "bold", color: colors.primary },
    stageDesc: { fontSize: 13, color: colors.textSecondary, marginTop: 12, lineHeight: 18 },

    tipRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 },
    tipText: { fontSize: 14, color: colors.text, fontWeight: "500" },

    dock: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        padding: 25,
        paddingBottom: 40,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 20,
    },
    primaryBtn: {
        backgroundColor: colors.primary,
        padding: 18,
        borderRadius: 18,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        elevation: 5,
    },
    primaryBtnText: { color: "white", fontSize: 18, fontWeight: "bold" },
    retakeBtn: { marginTop: 15, alignItems: "center" },
    retakeText: { color: colors.textSecondary, fontWeight: "bold", fontSize: 14 },
});
