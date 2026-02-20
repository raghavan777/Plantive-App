import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import useRoleBackPolicy from "../../hooks/useRoleBackPolicy";
import colors from "../../theme/colors";

export default function FarmerCaptureGuidanceScreen({ route, navigation }) {
    const selectedStage = route?.params?.stage || "Crop";
    useRoleBackPolicy({ navigation, homeRoute: "Home" });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Photography Guide</Text>
            </View>

            <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.introBox}>
                    <Text style={styles.title}>Perfect Shots = Fast Claims</Text>
                    <Text style={styles.subtitle}>Follow these simple tips to ensure our AI can accurately verify your crop health.</Text>
                </View>

                {/* MAIN TIPS */}
                <View style={styles.card}>
                    <View style={styles.tipHeader}>
                        <View style={[styles.iconWrap, { backgroundColor: colors.accent + "20" }]}>
                            <Ionicons name="sunny" size={26} color={colors.accent} />
                        </View>
                        <Text style={styles.tipTitle}>Natural Lighting</Text>
                    </View>
                    <Text style={styles.tipDesc}>Best results are achieved in the morning (8-11 AM) or afternoon (3-5 PM) when the sun is not directly overhead.</Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.tipHeader}>
                        <View style={[styles.iconWrap, { backgroundColor: colors.primary + "20" }]}>
                            <MaterialCommunityIcons name="focus-auto" size={26} color={colors.primary} />
                        </View>
                        <Text style={styles.tipTitle}>Steady & Focus</Text>
                    </View>
                    <Text style={styles.tipDesc}>Hold your phone steady at waist height. Tap the screen to focus on the area showing stress or disease.</Text>
                </View>

                {/* CHECKLIST */}
                <View style={[styles.card, { borderLeftWidth: 5, borderLeftColor: colors.success }]}>
                    <Text style={styles.sectionTitle}>Final Checklist</Text>
                    <CheckItem text="Is the crop filling 70% of the frame?" />
                    <CheckItem text="Is the image sharp and not blurry?" />
                    <CheckItem text="Are you capturing at least 3-5 photos?" />
                </View>

                {/* COMMON MISTAKES */}
                <View style={[styles.card, { borderLeftWidth: 5, borderLeftColor: colors.danger }]}>
                    <Text style={[styles.sectionTitle, { color: colors.danger }]}>Common Errors to Avoid</Text>
                    <ErrorItem text="Capturing against the sun (dark photos)" />
                    <ErrorItem text="Shadows falling across the plants" />
                    <ErrorItem text="Using digital zoom (low quality)" />
                </View>

                <View style={{ height: 120 }} />
            </ScrollView>

            <View style={styles.dock}>
                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => navigation.navigate("CaptureCamera", { stage: selectedStage })}
                >
                    <Text style={styles.primaryBtnText}>Open Smart Camera</Text>
                    <Ionicons name="camera" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const CheckItem = ({ text }) => (
    <View style={styles.listItem}>
        <Ionicons name="checkmark-circle" size={20} color={colors.success} />
        <Text style={styles.listText}>{text}</Text>
    </View>
);

const ErrorItem = ({ text }) => (
    <View style={styles.listItem}>
        <Ionicons name="close-circle" size={20} color={colors.danger} />
        <Text style={styles.listText}>{text}</Text>
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
    introBox: { marginBottom: 25 },
    title: { fontSize: 24, fontWeight: "bold", color: colors.text },
    subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 5, lineHeight: 20 },

    card: { backgroundColor: "white", borderRadius: 24, padding: 20, marginBottom: 20, elevation: 4 },
    tipHeader: { flexDirection: "row", alignItems: "center", gap: 15, marginBottom: 12 },
    iconWrap: { width: 50, height: 50, borderRadius: 15, justifyContent: "center", alignItems: "center" },
    tipTitle: { fontSize: 18, fontWeight: "bold", color: colors.text },
    tipDesc: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 },

    sectionTitle: { fontSize: 16, fontWeight: "bold", color: colors.success, marginBottom: 15 },
    listItem: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 },
    listText: { fontSize: 14, color: colors.text, fontWeight: "500" },

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
});
