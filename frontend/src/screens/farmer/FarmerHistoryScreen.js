import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import useRoleBackPolicy from "../../hooks/useRoleBackPolicy";
import colors from "../../theme/colors";

const historyData = [
    {
        id: "SUB24001",
        crop: "Paddy (Rice)",
        stage: "Flowering Stage",
        date: "Today, 10:30 AM",
        status: "Approved",
        statusColor: colors.success,
        image: "https://images.unsplash.com/photo-1536633343358-006277979607?w=400"
    },
    {
        id: "SUB24002",
        crop: "Wheat",
        stage: "Vegetative Stage",
        date: "Yesterday, 3:15 PM",
        status: "Processing",
        statusColor: colors.accent,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400"
    },
    {
        id: "SUB24003",
        crop: "Maize",
        stage: "Maturity Stage",
        date: "Dec 20, 2023",
        status: "Rejected",
        statusColor: colors.danger,
        image: "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=400"
    }
];

export default function FarmerHistoryScreen({ navigation }) {
    useRoleBackPolicy({ navigation, homeRoute: "Home" });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Submission History</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.topInfo}>
                    <Text style={styles.countText}>{historyData.length} Submissions found</Text>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name="filter" size={18} color={colors.primary} />
                        <Text style={styles.filterText}>Filter</Text>
                    </TouchableOpacity>
                </View>

                {historyData.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.9}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.cardBadge}>
                            <View style={[styles.dot, { backgroundColor: item.statusColor }]} />
                            <Text style={[styles.badgeText, { color: item.statusColor }]}>{item.status}</Text>
                        </View>

                        <View style={styles.cardContent}>
                            <View style={styles.rowBetween}>
                                <Text style={styles.cropTitle}>{item.crop}</Text>
                                <Text style={styles.idText}>#{item.id}</Text>
                            </View>
                            <Text style={styles.stageText}>{item.stage}</Text>

                            <View style={styles.footer}>
                                <View style={styles.dateBox}>
                                    <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
                                    <Text style={styles.dateText}>{item.date}</Text>
                                </View>
                                <TouchableOpacity style={styles.viewBtn}>
                                    <Text style={styles.viewText}>Details</Text>
                                    <Ionicons name="chevron-forward" size={14} color={colors.primary} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                <View style={{ height: 40 }} />
            </ScrollView>
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
    content: { padding: 20 },

    topInfo: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
    countText: { fontSize: 14, color: colors.textSecondary, fontWeight: "600" },
    filterBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "white", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, elevation: 2 },
    filterText: { fontSize: 14, color: colors.primary, marginLeft: 6, fontWeight: "bold" },

    card: { backgroundColor: "white", borderRadius: 24, marginBottom: 24, overflow: "hidden", elevation: 5 },
    image: { width: "100%", height: 180, backgroundColor: "#E0E0E0" },
    cardBadge: {
        position: "absolute",
        top: 15,
        right: 15,
        backgroundColor: "rgba(255,255,255,0.9)",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
    badgeText: { fontSize: 12, fontWeight: "bold" },

    cardContent: { padding: 16 },
    rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
    cropTitle: { fontSize: 18, fontWeight: "bold", color: colors.text },
    idText: { fontSize: 12, color: colors.primary + "99", fontWeight: "bold" },
    stageText: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },

    footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 15, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#F0F0F0" },
    dateBox: { flexDirection: "row", alignItems: "center" },
    dateText: { fontSize: 12, color: colors.textSecondary, marginLeft: 5 },
    viewBtn: { flexDirection: "row", alignItems: "center" },
    viewText: { fontSize: 14, fontWeight: "bold", color: colors.primary, marginRight: 2 },
});
