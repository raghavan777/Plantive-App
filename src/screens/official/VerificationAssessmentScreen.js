import { useMemo, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const cropStages = ["Sowing", "Vegetative", "Flowering", "Maturity", "Harvest"];
const checklistItems = [
    "Crop appears healthy",
    "Signs of water stress",
    "Pest infestation visible",
    "Disease symptoms present",
    "Lodging observed",
    "Flood damage visible",
];

export default function VerificationAssessmentScreen({ navigation }) {
    const [selectedStage, setSelectedStage] = useState("Flowering");
    const [damage, setDamage] = useState(0);
    const [trackWidth, setTrackWidth] = useState(1);
    const [checks, setChecks] = useState({
        "Crop appears healthy": true,
        "Signs of water stress": false,
        "Pest infestation visible": false,
        "Disease symptoms present": false,
        "Lodging observed": false,
        "Flood damage visible": false,
    });
    const [notes, setNotes] = useState("");

    const sliderLeft = useMemo(() => `${Math.min(100, Math.max(0, damage))}%`, [damage]);

    const updateDamageByPress = (x) => {
        const percent = Math.round((Math.max(0, Math.min(trackWidth, x)) / trackWidth) * 100);
        setDamage(percent);
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>verification/assessment</Text>
            </View>

            <View style={styles.headerBar}>
                <TouchableOpacity
                    style={styles.iconBtn}
                    onPress={() => navigation.navigate("VerificationCamera")}
                >
                    <Ionicons name="arrow-back" size={24} color="#0f3216" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Damage Assessment</Text>
                <View style={styles.iconBtn} />
            </View>

            <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Farm Details</Text>
                    <View style={styles.inlineRow}>
                        <Ionicons name="person-outline" size={18} color="#6eae69" />
                        <Text style={styles.inlineText}>Farmer: Rajesh Kumar</Text>
                    </View>
                    <View style={styles.inlineRow}>
                        <Ionicons name="leaf-outline" size={18} color="#6eae69" />
                        <Text style={styles.inlineText}>Crop: Paddy</Text>
                    </View>
                    <View style={styles.inlineRow}>
                        <Ionicons name="location-outline" size={18} color="#6eae69" />
                        <Text style={styles.inlineText}>Village: Shantinagar</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Crop Stage *</Text>
                    <View style={styles.stageRow}>
                        {cropStages.map((stage) => {
                            const selected = selectedStage === stage;
                            return (
                                <TouchableOpacity
                                    key={stage}
                                    style={[styles.stageChip, selected && styles.stageChipActive]}
                                    onPress={() => setSelectedStage(stage)}
                                >
                                    <Text style={[styles.stageText, selected && styles.stageTextActive]}>
                                        {stage}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Damage Percentage: {damage}%</Text>
                    <Pressable
                        style={styles.track}
                        onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
                        onPress={(event) => updateDamageByPress(event.nativeEvent.locationX)}
                    >
                        <View style={[styles.progress, { width: `${damage}%` }]} />
                        <View style={[styles.knob, { left: sliderLeft }]} />
                    </Pressable>

                    <View style={styles.scaleRow}>
                        <Text style={styles.scaleText}>0%</Text>
                        <Text style={styles.scaleText}>25%</Text>
                        <Text style={styles.scaleText}>50%</Text>
                        <Text style={styles.scaleText}>75%</Text>
                        <Text style={styles.scaleText}>100%</Text>
                    </View>

                    <View style={styles.legendRow}>
                        <Text style={styles.legendMinor}>● Minor (0-25%)</Text>
                    </View>
                    <View style={styles.legendRow}>
                        <Text style={styles.legendModerate}>● Moderate (26-50%)</Text>
                    </View>
                    <View style={styles.legendRow}>
                        <Text style={styles.legendSevere}>● Severe (51-100%)</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Quick Checklist</Text>
                    {checklistItems.map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={styles.checkRow}
                            onPress={() => setChecks((prev) => ({ ...prev, [item]: !prev[item] }))}
                        >
                            <View style={[styles.checkbox, checks[item] && styles.checkboxChecked]}>
                                {checks[item] ? <Ionicons name="checkmark" size={14} color="#fff" /> : null}
                            </View>
                            <Text style={styles.checkText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Notes & Observations</Text>
                    <TextInput
                        value={notes}
                        onChangeText={setNotes}
                        placeholder="Enter any observations about the crop condition..."
                        placeholderTextColor="#89b286"
                        multiline
                        style={styles.notesInput}
                    />
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.submitBtn} onPress={() => navigation.navigate("Reports")}>
                    <Text style={styles.submitBtnText}>Review & Submit</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
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
        backgroundColor: "#38a753",
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    topBarText: {
        color: "#fff",
        fontSize: 38,
        fontWeight: "700",
    },
    headerBar: {
        marginTop: 0,
        minHeight: 54,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#dbe2db",
    },
    iconBtn: {
        width: 34,
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#0f2f14",
    },
    scroll: {
        flex: 1,
    },
    content: {
        paddingBottom: 96,
    },
    card: {
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#dbe2db",
        backgroundColor: "#fff",
        padding: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1f3a22",
        marginBottom: 10,
    },
    inlineRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
    },
    inlineText: {
        fontSize: 16,
        color: "#27422a",
    },
    stageRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    stageChip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: "#eef2ee",
        borderWidth: 1,
        borderColor: "#d0d8cf",
    },
    stageChipActive: {
        backgroundColor: "#38a753",
        borderColor: "#38a753",
    },
    stageText: {
        color: "#2f4732",
        fontSize: 14,
        fontWeight: "600",
    },
    stageTextActive: {
        color: "#fff",
    },
    track: {
        height: 10,
        borderRadius: 6,
        backgroundColor: "#d5d9d5",
        marginTop: 6,
        justifyContent: "center",
    },
    progress: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "#49b259",
        borderRadius: 6,
    },
    knob: {
        position: "absolute",
        marginLeft: -12,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#49b259",
        borderWidth: 2,
        borderColor: "#fff",
    },
    scaleRow: {
        marginTop: 18,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    scaleText: {
        color: "#7ca977",
        fontSize: 12,
        fontWeight: "700",
    },
    legendRow: {
        marginTop: 6,
    },
    legendMinor: {
        color: "#48b257",
        fontSize: 12,
    },
    legendModerate: {
        color: "#f39b08",
        fontSize: 12,
    },
    legendSevere: {
        color: "#f04545",
        fontSize: 12,
    },
    checkRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        gap: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#7ab778",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxChecked: {
        backgroundColor: "#49b259",
        borderColor: "#49b259",
    },
    checkText: {
        fontSize: 17,
        color: "#2c452f",
    },
    notesInput: {
        minHeight: 100,
        borderWidth: 1,
        borderColor: "#d8dfd8",
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        color: "#29402a",
        textAlignVertical: "top",
        backgroundColor: "#f5f8f4",
    },
    footer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#dbe2db",
        padding: 10,
    },
    submitBtn: {
        minHeight: 54,
        borderRadius: 12,
        backgroundColor: "#39a753",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },
    submitBtnText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
});
