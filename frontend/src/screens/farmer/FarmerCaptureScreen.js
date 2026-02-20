import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useRoleBackPolicy from "../../hooks/useRoleBackPolicy";

const stageCards = [
    { id: "Sowing", icon: "leaf-outline" },
    { id: "Vegetative", icon: "nutrition-outline" },
    { id: "Flowering", icon: "flower-outline" },
    { id: "Maturity", icon: "sunny-outline" },
    { id: "Harvest", icon: "cut-outline" },
];

const guideItems = [
    {
        title: "Good Lighting",
        subtitle: "Ensure adequate natural light. Avoid shadows on the crop.",
        icon: "sunny",
    },
    {
        title: "Proper Distance",
        subtitle: "Maintain 1-2 meters distance. Entire crop should be in frame.",
        icon: "scan-circle",
    },
    {
        title: "Steady Camera",
        subtitle: "Hold phone steady. Auto-capture when conditions are perfect.",
        icon: "camera",
    },
];

const recentCaptures = [
    { crop: "Paddy", stage: "Flowering Stage", time: "Today, 10:30 AM" },
    { crop: "Wheat", stage: "Vegetative Stage", time: "Yesterday, 3:15 PM" },
    { crop: "Maize", stage: "Maturity Stage", time: "Dec 20, 9:45 AM" },
];

export default function FarmerCaptureScreen({ navigation }) {
    const [selectedStage, setSelectedStage] = useState(null);
    useRoleBackPolicy({ navigation, homeRoute: "Home" });

    const openCamera = () => {
        navigation.navigate("CaptureCamera", { stage: selectedStage || "Flowering" });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>capture/index</Text>
            </View>

            <View style={styles.hero}>
                <Text style={styles.heroTitle}>Capture Crop Image</Text>
                <Text style={styles.heroSubtitle}>Select crop stage for image capture</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Select Crop Stage</Text>
                <Text style={styles.sectionSub}>
                    Choose the current stage of your crop for accurate analysis
                </Text>

                <View style={styles.grid}>
                    {stageCards.map((stage) => {
                        const selected = selectedStage === stage.id;
                        return (
                            <TouchableOpacity
                                key={stage.id}
                                style={[styles.stageCard, selected && styles.stageCardSelected]}
                                onPress={() => setSelectedStage(stage.id)}
                                activeOpacity={0.85}
                            >
                                <Ionicons
                                    name={stage.icon}
                                    size={28}
                                    color={selected ? "#fff" : "#0f2f14"}
                                />
                                <Text style={[styles.stageText, selected && styles.stageTextSelected]}>
                                    {stage.id}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <TouchableOpacity style={styles.captureBtn} onPress={openCamera} activeOpacity={0.85}>
                    <Ionicons name="camera" size={20} color="#fff" />
                    <Text style={styles.captureBtnText}>Start Capture</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Capture Guide</Text>
                {guideItems.map((item) => (
                    <View key={item.title} style={styles.guideRow}>
                        <View style={styles.guideIconWrap}>
                            <Ionicons name={item.icon} size={24} color="#32a654" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.guideTitle}>{item.title}</Text>
                            <Text style={styles.guideSub}>{item.subtitle}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.card}>
                <View style={styles.recentHeader}>
                    <Text style={styles.sectionTitle}>Recent Captures</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAll}>View All</Text>
                    </TouchableOpacity>
                </View>

                {recentCaptures.map((item) => (
                    <TouchableOpacity key={`${item.crop}-${item.time}`} style={styles.recentRow}>
                        <Ionicons name="images" size={28} color="#34a755" />
                        <View style={styles.recentBody}>
                            <Text style={styles.recentCrop}>{item.crop}</Text>
                            <Text style={styles.recentStage}>{item.stage}</Text>
                            <Text style={styles.recentTime}>{item.time}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="#8a8f95" />
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.helpWrap}>
                <Text style={styles.helpTitle}>Need Help?</Text>
                <TouchableOpacity
                    style={styles.helpBtn}
                    onPress={() => navigation.navigate("CaptureGuidance")}
                    activeOpacity={0.85}
                >
                    <Ionicons name="help-circle" size={20} color="#fff" />
                    <Text style={styles.helpBtnText}>View Capture Guide</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#edf2ec",
    },
    content: {
        paddingBottom: 24,
    },
    topBar: {
        height: 70,
        backgroundColor: "#38a753",
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    topBarText: {
        color: "#fff",
        fontSize: 36,
        fontWeight: "700",
    },
    hero: {
        alignItems: "center",
        paddingTop: 18,
        paddingBottom: 10,
    },
    heroTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: "#0f2f14",
    },
    heroSubtitle: {
        marginTop: 6,
        fontSize: 18,
        color: "#66727a",
    },
    card: {
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#dbe2db",
        backgroundColor: "#fff",
        padding: 14,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#12341a",
    },
    sectionSub: {
        marginTop: 4,
        color: "#6a757d",
        fontSize: 15,
    },
    grid: {
        marginTop: 12,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    stageCard: {
        width: "48.5%",
        minHeight: 110,
        borderRadius: 12,
        backgroundColor: "#edf2ec",
        borderWidth: 1,
        borderColor: "#dbe2db",
        alignItems: "center",
        justifyContent: "center",
    },
    stageCardSelected: {
        backgroundColor: "#39a753",
        borderColor: "#39a753",
    },
    stageText: {
        marginTop: 8,
        fontSize: 18,
        color: "#0f2f14",
        fontWeight: "700",
    },
    stageTextSelected: {
        color: "#fff",
    },
    captureBtn: {
        marginTop: 12,
        height: 48,
        borderRadius: 10,
        backgroundColor: "#39a753",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },
    captureBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    guideRow: {
        marginTop: 10,
        minHeight: 76,
        borderRadius: 10,
        backgroundColor: "#edf2ec",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        gap: 12,
    },
    guideIconWrap: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#d9e8d8",
        alignItems: "center",
        justifyContent: "center",
    },
    guideTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#12341a",
    },
    guideSub: {
        marginTop: 2,
        color: "#6b757d",
        fontSize: 14,
    },
    recentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    viewAll: {
        color: "#2f9d4d",
        fontWeight: "700",
    },
    recentRow: {
        marginTop: 10,
        minHeight: 82,
        borderRadius: 10,
        backgroundColor: "#edf2ec",
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    recentBody: {
        flex: 1,
    },
    recentCrop: {
        fontSize: 18,
        color: "#13361b",
        fontWeight: "700",
    },
    recentStage: {
        marginTop: 2,
        color: "#3ca65a",
        fontSize: 16,
    },
    recentTime: {
        marginTop: 2,
        color: "#77838a",
        fontSize: 14,
    },
    helpWrap: {
        marginHorizontal: 10,
        marginTop: 16,
        alignItems: "center",
    },
    helpTitle: {
        fontSize: 20,
        color: "#12341a",
        fontWeight: "700",
    },
    helpBtn: {
        marginTop: 10,
        width: "100%",
        minHeight: 54,
        borderRadius: 12,
        backgroundColor: "#89b884",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },
    helpBtnText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "700",
    },
});
