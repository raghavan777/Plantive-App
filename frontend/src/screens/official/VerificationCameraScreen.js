import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import useRoleBackPolicy from "../../hooks/useRoleBackPolicy";
import colors from "../../theme/colors";

const thumbs = [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=240",
    "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=240",
    "https://images.unsplash.com/photo-1444858291040-58f756a3bcd6?w=240",
];

export default function VerificationCameraScreen({ navigation }) {
    useRoleBackPolicy({ navigation, homeRoute: "OfficerHome" });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Field Capture</Text>
            </View>

            <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.introBox}>
                    <Text style={styles.title}>Required Photos</Text>
                    <Text style={styles.subtitle}>Capture authentic field data to support the claim verification.</Text>
                </View>

                {/* CAPTURE TYPES */}
                <CaptureType
                    icon="camera-retake"
                    title="Wide Angle View"
                    desc="Show the entire farm plot boundary"
                    count="1/1"
                    done
                />

                <CaptureType
                    icon="camera-iris"
                    title="Crop Close-up"
                    desc="Focus on plant health and leaf details"
                    count="0/2"
                />

                <CaptureType
                    icon="alert-rect-outline"
                    title="Damage Evidence"
                    desc="Capture specific areas showing loss/pest"
                    count="3/5"
                />

                {/* THUMBNAILS STRIP */}
                <View style={[styles.card, { padding: 15 }]}>
                    <Text style={styles.cardTitle}>Captured Evidence</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbScroll}>
                        {thumbs.map((uri, idx) => (
                            <View key={idx} style={styles.thumbWrap}>
                                <Image source={{ uri }} style={styles.thumbImage} />
                                <TouchableOpacity style={styles.removeBtn}>
                                    <Ionicons name="close" size={12} color="white" />
                                </TouchableOpacity>
                            </View>
                        ))}
                        <TouchableOpacity style={styles.addThumb}>
                            <Ionicons name="camera-plus" size={24} color={colors.primary} />
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                {/* AI QUALITY CHECK */}
                <View style={styles.aiBanner}>
                    <MaterialCommunityIcons name="robot-confused-outline" size={24} color={colors.primary} />
                    <Text style={styles.aiText}>AI is checking image clarity in the background...</Text>
                </View>

                <View style={{ height: 120 }} />
            </ScrollView>

            <View style={styles.dock}>
                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => navigation.navigate("VerificationAssessment")}
                >
                    <Text style={styles.primaryBtnText}>Proceed to Assessment</Text>
                    <Ionicons name="clipboard-check" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const CaptureType = ({ icon, title, desc, count, done }) => (
    <View style={[styles.typeCard, done && styles.typeCardDone]}>
        <View style={[styles.typeIcon, { backgroundColor: done ? colors.success + "20" : colors.primary + "10" }]}>
            <MaterialCommunityIcons name={icon} size={26} color={done ? colors.success : colors.primary} />
        </View>
        <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={[styles.typeTitle, done && { color: colors.success }]}>{title}</Text>
            <Text style={styles.typeDesc}>{desc}</Text>
        </View>
        <View style={[styles.countBadge, done && { backgroundColor: colors.success }]}>
            <Text style={[styles.countText, done && { color: "white" }]}>{count}</Text>
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
        paddingHorizontal: 20,
    },
    headerTitle: { color: "white", fontSize: 20, fontWeight: "bold", marginLeft: 15 },
    backBtn: { padding: 5 },

    scroll: { padding: 20 },
    introBox: { marginBottom: 25 },
    title: { fontSize: 24, fontWeight: "bold", color: colors.text },
    subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 5, lineHeight: 20 },

    typeCard: { flexDirection: "row", alignItems: "center", backgroundColor: "white", borderRadius: 24, padding: 18, marginBottom: 15, elevation: 3 },
    typeCardDone: { borderWidth: 1, borderColor: colors.success + "50" },
    typeIcon: { width: 54, height: 54, borderRadius: 18, justifyContent: "center", alignItems: "center" },
    typeTitle: { fontSize: 16, fontWeight: "bold", color: colors.text },
    typeDesc: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
    countBadge: { backgroundColor: colors.background, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
    countText: { fontSize: 12, fontWeight: "bold", color: colors.textSecondary },

    card: { backgroundColor: "white", borderRadius: 24, padding: 20, marginBottom: 20, elevation: 4 },
    cardTitle: { fontSize: 15, fontWeight: "bold", color: colors.text, marginBottom: 15 },
    thumbScroll: { flexDirection: "row", gap: 15 },
    thumbWrap: { position: "relative", marginRight: 15 },
    thumbImage: { width: 80, height: 80, borderRadius: 15 },
    removeBtn: { position: "absolute", top: -5, right: -5, width: 22, height: 22, borderRadius: 11, backgroundColor: colors.danger, justifyContent: "center", alignItems: "center", elevation: 3 },
    addThumb: { width: 80, height: 80, borderRadius: 15, backgroundColor: colors.primary + "10", borderStyle: "dashed", borderWidth: 2, borderColor: colors.primary, justifyContent: "center", alignItems: "center" },

    aiBanner: { flexDirection: "row", alignItems: "center", backgroundColor: colors.primary + "08", padding: 15, borderRadius: 15, gap: 12, borderWidth: 1, borderColor: colors.primary + "15" },
    aiText: { fontSize: 12, color: colors.primary, fontWeight: "600", flex: 1 },

    dock: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 25, paddingBottom: 40, backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 30, elevation: 20 },
    primaryBtn: { backgroundColor: colors.primary, padding: 18, borderRadius: 18, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 12, elevation: 5 },
    primaryBtnText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
