import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import useRoleBackPolicy from "../../hooks/useRoleBackPolicy";
import colors from "../../theme/colors";

const recentStages = [
    { id: "Vegetative", subtitle: "Yesterday - 3 photos", icon: "leaf", tint: colors.success },
    { id: "Flowering", subtitle: "Jan 10 - 5 photos", icon: "flower", tint: "#E91E63" },
];

const stageCards = [
    { id: "Sowing", subtitle: "Seed planting and germination", hints: ["Soil moisture", "Depth"], days: "0-30", shots: "2", icon: "sprout", tint: "#795548" },
    { id: "Vegetative", subtitle: "Leaf and stem development", hints: ["Leaf color", "Height"], days: "30-60", shots: "3", icon: "leaf", tint: colors.success },
    { id: "Flowering", subtitle: "Flower development stage", hints: ["Density", "Petals"], days: "60-90", shots: "5", icon: "flower", tint: "#E91E63" },
    { id: "Maturity", subtitle: "Grain filling and ripening", hints: ["Hardness", "Color"], days: "90-120", shots: "4", icon: "corn", tint: colors.accent },
    { id: "Harvest", subtitle: "Harvesting and post-harvest", hints: ["Yield", "Storage"], days: "120+", shots: "6", icon: "tractor", tint: "#8D6E63" },
];

export default function FarmerCaptureStageScreen({ navigation }) {
    const [selectedStage, setSelectedStage] = useState(null);
    useRoleBackPolicy({ navigation, homeRoute: "Home" });

    const continueToGuidance = () => {
        if (!selectedStage) return;
        navigation.navigate("CaptureCamera", { stage: selectedStage });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Crop Stage</Text>
            </View>

            <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.intro}>
                    <Text style={styles.title}>What's the current stage?</Text>
                    <Text style={styles.subtitle}>Select the growth phase for accurate AI analysis</Text>
                </View>

                {/* RECENT */}
                <Text style={styles.sectionTitle}>Recently Used</Text>
                {recentStages.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.recentCard}
                        onPress={() => navigation.navigate("CaptureCamera", { stage: item.id })}
                    >
                        <View style={[styles.recentIcon, { backgroundColor: item.tint + "15" }]}>
                            <MaterialCommunityIcons name={item.icon} size={24} color={item.tint} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 15 }}>
                            <Text style={[styles.recentText, { color: item.tint }]}>{item.id}</Text>
                            <Text style={styles.recentSub}>{item.subtitle}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                ))}

                {/* ALL STAGES */}
                <Text style={styles.sectionTitle}>Growth Journey</Text>
                <View style={styles.grid}>
                    {stageCards.map((item) => {
                        const active = selectedStage === item.id;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[styles.stageCard, active && styles.stageCardActive]}
                                onPress={() => setSelectedStage(item.id)}
                            >
                                <View style={[styles.stageIconWrap, { backgroundColor: active ? "white" : item.tint + "10" }]}>
                                    <MaterialCommunityIcons name={item.icon} size={32} color={active ? colors.primary : item.tint} />
                                </View>
                                <Text style={[styles.stageName, active && { color: "white" }]}>{item.id}</Text>
                                <Text style={[styles.stageDays, active && { color: "rgba(255,255,255,0.8)" }]}>Day {item.days}</Text>

                                {active && (
                                    <View style={styles.activeCheck}>
                                        <Ionicons name="checkmark-circle" size={20} color="white" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* AI TIP */}
                <View style={styles.aiTip}>
                    <MaterialCommunityIcons name="robot-outline" size={30} color={colors.primary} />
                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.aiTipTitle}>Not sure?</Text>
                        <Text style={styles.aiTipSub}>Our "Smart AI Scan" can automatically identify the stage from your first photo.</Text>
                    </View>
                </View>

                <View style={{ height: 120 }} />
            </ScrollView>

            <View style={styles.dock}>
                <TouchableOpacity
                    style={[styles.primaryBtn, !selectedStage && styles.btnDisabled]}
                    onPress={continueToGuidance}
                    disabled={!selectedStage}
                >
                    <Text style={styles.primaryBtnText}>Continue to Camera</Text>
                    <Ionicons name="camera" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("CaptureCamera")}>
                    <Text style={styles.skipLink}>Skip and Detect Automatically</Text>
                </TouchableOpacity>
            </View>
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
    intro: { marginBottom: 25 },
    title: { fontSize: 24, fontWeight: "bold", color: colors.text },
    subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 5 },

    sectionTitle: { fontSize: 16, fontWeight: "bold", color: colors.textSecondary, marginBottom: 15, marginTop: 10 },

    recentCard: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderRadius: 20,
        marginBottom: 12,
        elevation: 3,
    },
    recentIcon: { width: 45, height: 45, borderRadius: 15, justifyContent: "center", alignItems: "center" },
    recentText: { fontSize: 16, fontWeight: "bold" },
    recentSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },

    grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
    stageCard: {
        width: "48%",
        backgroundColor: "white",
        borderRadius: 24,
        padding: 20,
        marginBottom: 15,
        alignItems: "center",
        elevation: 4,
    },
    stageCardActive: { backgroundColor: colors.primary },
    stageIconWrap: { width: 60, height: 60, borderRadius: 20, justifyContent: "center", alignItems: "center", marginBottom: 12 },
    stageName: { fontSize: 16, fontWeight: "bold", color: colors.text },
    stageDays: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
    activeCheck: { position: "absolute", top: 10, right: 10 },

    aiTip: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        borderRadius: 24,
        marginTop: 10,
        borderWidth: 1,
        borderColor: colors.primary + "30",
    },
    aiTipTitle: { fontSize: 16, fontWeight: "bold", color: colors.primary },
    aiTipSub: { fontSize: 13, color: colors.textSecondary, marginTop: 4, lineHeight: 18 },

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
        alignItems: "center",
    },
    primaryBtn: {
        width: "100%",
        backgroundColor: colors.primary,
        padding: 18,
        borderRadius: 18,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        elevation: 5,
    },
    btnDisabled: { backgroundColor: "#E0E0E0" },
    primaryBtnText: { color: "white", fontSize: 16, fontWeight: "bold" },
    skipLink: { marginTop: 15, color: colors.textSecondary, textDecorationLine: "underline", fontWeight: "600" },
});
