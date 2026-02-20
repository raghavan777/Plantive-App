import { useMemo, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import useRoleBackPolicy from "../../hooks/useRoleBackPolicy";
import colors from "../../theme/colors";

export default function VerificationAssessmentScreen({ navigation }) {
    useRoleBackPolicy({ navigation, homeRoute: "OfficerHome" });
    const [selectedStage, setSelectedStage] = useState("Flowering");
    const [damage, setDamage] = useState(30);
    const [trackWidth, setTrackWidth] = useState(1);
    const [notes, setNotes] = useState("");

    const updateDamageByPress = (x) => {
        const percent = Math.round((Math.max(0, Math.min(trackWidth, x)) / trackWidth) * 100);
        setDamage(percent);
    };

    const getDamageColor = () => {
        if (damage < 25) return colors.success;
        if (damage < 50) return colors.warning;
        return colors.danger;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Damage Assessment</Text>
            </View>

            <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* FARM SUMMARY */}
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryLabel}>Currently Reviewing</Text>
                    <Text style={styles.summaryValue}>Farm #A123 (Ramesh Patel)</Text>
                </View>

                {/* CROP STAGE SELECTION */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Verified Growth Stage</Text>
                    <View style={styles.stageGrid}>
                        {["Sowing", "Vegetative", "Flowering", "Maturity"].map(s => (
                            <TouchableOpacity
                                key={s}
                                style={[styles.stageBtn, selectedStage === s && styles.stageBtnActive]}
                                onPress={() => setSelectedStage(s)}
                            >
                                <Text style={[styles.stageBtnText, selectedStage === s && { color: "white" }]}>{s}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* DAMAGE SLIDER */}
                <View style={styles.card}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.cardTitle}>Damage Intensity</Text>
                        <Text style={[styles.damagePercent, { color: getDamageColor() }]}>{damage}%</Text>
                    </View>

                    <Pressable
                        style={styles.track}
                        onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
                        onPress={(e) => updateDamageByPress(e.nativeEvent.locationX)}
                    >
                        <View style={[styles.progress, { width: `${damage}%`, backgroundColor: getDamageColor() }]} />
                        <View style={[styles.knob, { left: `${damage}%`, backgroundColor: getDamageColor() }]} />
                    </Pressable>

                    <View style={styles.scaleRow}>
                        <Text style={styles.scaleText}>0%</Text>
                        <Text style={styles.scaleText}>Minor</Text>
                        <Text style={styles.scaleText}>Moderate</Text>
                        <Text style={styles.scaleText}>Severe</Text>
                        <Text style={styles.scaleText}>100%</Text>
                    </View>
                </View>

                {/* CHECKLIST */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Physical Observations</Text>
                    <ObsItem label="Leaf Discoloration" active />
                    <ObsItem label="Pest Infestation" active />
                    <ObsItem label="Water Logging" />
                    <ObsItem label="Wind Damage" />
                </View>

                {/* NOTES */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Field Notes</Text>
                    <TextInput
                        style={styles.notesInput}
                        placeholder="Describe the condition in detail..."
                        multiline
                        numberOfLines={4}
                        value={notes}
                        onChangeText={setNotes}
                    />
                </View>

                <View style={{ height: 120 }} />
            </ScrollView>

            <View style={styles.dock}>
                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => navigation.navigate("Reports")}
                >
                    <Text style={styles.primaryBtnText}>Review & Submit Assessment</Text>
                    <Ionicons name="checkmark-done" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const ObsItem = ({ label, active }) => (
    <TouchableOpacity style={styles.obsItem}>
        <View style={[styles.obsCheck, active && { backgroundColor: colors.primary, borderColor: colors.primary }]}>
            {active && <Ionicons name="checkmark" size={12} color="white" />}
        </View>
        <Text style={[styles.obsLabel, active && { fontWeight: "bold", color: colors.text }]}>{label}</Text>
    </TouchableOpacity>
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

    scroll: { padding: 18 },
    summaryBox: { backgroundColor: colors.primary + "10", borderRadius: 20, padding: 18, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: colors.primary },
    summaryLabel: { fontSize: 11, color: colors.textSecondary, textTransform: "uppercase", fontWeight: "bold" },
    summaryValue: { fontSize: 16, fontWeight: "bold", color: colors.text, marginTop: 4 },

    card: { backgroundColor: "white", borderRadius: 24, padding: 22, marginBottom: 20, elevation: 4 },
    cardTitle: { fontSize: 17, fontWeight: "bold", color: colors.text, marginBottom: 15 },
    rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },

    stageGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    stageBtn: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 15, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border },
    stageBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    stageBtnText: { fontSize: 13, fontWeight: "bold", color: colors.textSecondary },

    damagePercent: { fontSize: 24, fontWeight: "bold" },
    track: { height: 10, backgroundColor: "#E0E0E0", borderRadius: 5, marginTop: 10, position: "relative" },
    progress: { position: "absolute", left: 0, top: 0, bottom: 0, borderRadius: 5 },
    knob: { position: "absolute", width: 26, height: 26, borderRadius: 13, top: -8, marginLeft: -13, borderWidth: 3, borderColor: "white", elevation: 4 },
    scaleRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
    scaleText: { fontSize: 10, color: colors.textSecondary, fontWeight: "bold" },

    obsItem: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 15 },
    obsCheck: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: colors.border, justifyContent: "center", alignItems: "center" },
    obsLabel: { fontSize: 15, color: colors.textSecondary },

    notesInput: { backgroundColor: colors.background, borderRadius: 15, padding: 15, textAlignVertical: "top", fontSize: 14, color: colors.text, borderWidth: 1, borderColor: colors.border },

    dock: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 25, paddingBottom: 40, backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 30, elevation: 20 },
    primaryBtn: { backgroundColor: colors.primary, padding: 18, borderRadius: 18, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 12, elevation: 5 },
    primaryBtnText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
