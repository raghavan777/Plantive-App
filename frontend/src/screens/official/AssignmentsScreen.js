import { useMemo, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView,
} from "react-native";
import useRoleBackPolicy from "../../hooks/useRoleBackPolicy";
import colors from "../../theme/colors";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

const assignments = [
    {
        id: "A123",
        farmer: "Ramesh Patel",
        crop: "Rice",
        village: "Ramgarh",
        assigned: "2024-01-15",
        deadline: "Today, 4 PM",
        status: "Urgent",
    },
    {
        id: "B456",
        farmer: "Suresh Yadav",
        crop: "Wheat",
        village: "Sohna",
        assigned: "2024-01-15",
        deadline: "Tomorrow, 11 AM",
        status: "New",
    },
    {
        id: "C789",
        farmer: "Anita Sharma",
        crop: "Sugarcane",
        village: "Badshahpur",
        assigned: "2024-01-14",
        deadline: "Jan 18, 2 PM",
        status: "Pending",
    },
];

const filterChips = ["All", "New", "Urgent", "Pending"];

export default function AssignmentsScreen({ navigation }) {
    useRoleBackPolicy({ navigation, homeRoute: "OfficerHome" });
    const [query, setQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredAssignments = useMemo(() => {
        const text = query.trim().toLowerCase();
        return assignments.filter((item) => {
            const matchesFilter = activeFilter === "All" || item.status === activeFilter;
            const matchesQuery = !text ||
                item.farmer.toLowerCase().includes(text) ||
                item.village.toLowerCase().includes(text) ||
                item.id.toLowerCase().includes(text);
            return matchesFilter && matchesQuery;
        });
    }, [activeFilter, query]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Assignments</Text>
            </View>

            <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search farmers or villages..."
                    style={styles.searchInput}
                    placeholderTextColor={colors.textSecondary + "90"}
                />
            </View>

            <View style={styles.filterSection}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    {filterChips.map(chip => (
                        <TouchableOpacity
                            key={chip}
                            style={[styles.chip, activeFilter === chip && styles.chipActive]}
                            onPress={() => setActiveFilter(chip)}
                        >
                            <Text style={[styles.chipText, activeFilter === chip && styles.chipTextActive]}>{chip}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {filteredAssignments.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View>
                                <Text style={styles.farmerName}>{item.farmer}</Text>
                                <Text style={styles.idText}>Farm #{item.id}</Text>
                            </View>
                            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + "15" }]}>
                                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
                            </View>
                        </View>

                        <View style={styles.cardBody}>
                            <View style={styles.infoRow}>
                                <View style={styles.infoBox}>
                                    <Text style={styles.infoLbl}>Crop</Text>
                                    <Text style={styles.infoVal}>{item.crop}</Text>
                                </View>
                                <View style={styles.infoBox}>
                                    <Text style={styles.infoLbl}>Village</Text>
                                    <Text style={styles.infoVal}>{item.village}</Text>
                                </View>
                            </View>

                            <View style={[styles.deadlineBox, { backgroundColor: item.status === "Urgent" ? "#FFF5F5" : "#F8FAF8" }]}>
                                <Ionicons name="time-outline" size={16} color={item.status === "Urgent" ? colors.danger : colors.textSecondary} />
                                <Text style={[styles.deadlineText, item.status === "Urgent" && { color: colors.danger }]}>
                                    Deadline: {item.deadline}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.cardFooter}>
                            <TouchableOpacity style={styles.detailsBtn} onPress={() => navigation.navigate("FarmDetails")}>
                                <Text style={styles.detailsBtnText}>View Details</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.startBtn, { backgroundColor: item.status === "Urgent" ? colors.danger : colors.primary }]}
                                onPress={() => navigation.navigate("Verify", { task: item })}
                            >
                                <Text style={styles.startBtnText}>Start Visit</Text>
                                <Ionicons name="chevron-forward" size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const getStatusColor = (status) => {
    switch (status) {
        case "Urgent": return colors.danger;
        case "Pending": return colors.accent;
        default: return colors.primary;
    }
};

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

    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        margin: 20,
        marginBottom: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        height: 54,
        elevation: 3,
    },
    searchIcon: { marginRight: 10 },
    searchInput: { flex: 1, fontSize: 16, color: colors.text },

    filterSection: { marginBottom: 10 },
    filterScroll: { paddingHorizontal: 20, gap: 10 },
    chip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: "white", elevation: 2 },
    chipActive: { backgroundColor: colors.primary },
    chipText: { fontSize: 14, fontWeight: "600", color: colors.textSecondary },
    chipTextActive: { color: "white" },

    scroll: { padding: 20 },
    card: { backgroundColor: "white", borderRadius: 24, padding: 20, marginBottom: 20, elevation: 4 },
    cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 15 },
    farmerName: { fontSize: 18, fontWeight: "bold", color: colors.text },
    idText: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
    statusText: { fontSize: 11, fontWeight: "bold" },

    cardBody: { marginBottom: 20 },
    infoRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
    infoBox: { flex: 1 },
    infoLbl: { fontSize: 12, color: colors.textSecondary },
    infoVal: { fontSize: 16, fontWeight: "700", color: colors.text, marginTop: 2 },

    deadlineBox: { flexDirection: "row", alignItems: "center", padding: 12, borderRadius: 12, gap: 8 },
    deadlineText: { fontSize: 13, fontWeight: "600", color: colors.textSecondary },

    cardFooter: { flexDirection: "row", gap: 10 },
    detailsBtn: { flex: 1, padding: 15, borderRadius: 15, borderWidth: 1, borderColor: colors.border, alignItems: "center" },
    detailsBtnText: { color: colors.primary, fontWeight: "bold" },
    startBtn: { flex: 1.5, padding: 15, borderRadius: 15, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 },
    startBtnText: { color: "white", fontWeight: "bold" },
});
