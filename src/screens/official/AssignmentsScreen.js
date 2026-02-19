import { useMemo, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

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
    {
        id: "D101",
        farmer: "Mohan Singh",
        crop: "Cotton",
        village: "Fazilpur",
        assigned: "2024-01-14",
        deadline: "Jan 20, 10 AM",
        status: "New",
    },
    {
        id: "E202",
        farmer: "Geeta Devi",
        crop: "Maize",
        village: "Kherla",
        assigned: "2024-01-13",
        deadline: "Jan 17, 3 PM",
        status: "Urgent",
    },
];

const filterChips = ["All Farms", "New", "Urgent", "Pending"];

export default function AssignmentsScreen({ navigation }) {
    const [query, setQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All Farms");

    const counts = useMemo(
        () => ({
            New: assignments.filter((item) => item.status === "New").length,
            Urgent: assignments.filter((item) => item.status === "Urgent").length,
            Pending: assignments.filter((item) => item.status === "Pending").length,
        }),
        []
    );

    const filteredAssignments = useMemo(() => {
        const text = query.trim().toLowerCase();

        return assignments.filter((item) => {
            const matchesFilter = activeFilter === "All Farms" || item.status === activeFilter;
            const matchesQuery =
                !text ||
                item.farmer.toLowerCase().includes(text) ||
                item.crop.toLowerCase().includes(text) ||
                item.village.toLowerCase().includes(text) ||
                item.id.toLowerCase().includes(text);

            return matchesFilter && matchesQuery;
        });
    }, [activeFilter, query]);

    const getStatusPillStyle = (status) => {
        if (status === "Urgent") return styles.urgentPill;
        if (status === "Pending") return styles.pendingPill;
        return styles.newPill;
    };

    const getStartVisitStyle = (status) => {
        return status === "Urgent" ? styles.startBtnUrgent : styles.startBtnNormal;
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.topBarTitle}>Assigned Farms</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Assigned Farms</Text>
                <Text style={styles.subtitle}>Total: {assignments.length} farms assigned</Text>

                <View style={styles.searchRow}>
                    <TextInput
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Search by farmer name, crop, or village..."
                        placeholderTextColor="#707b80"
                        style={styles.searchInput}
                    />
                    <TouchableOpacity style={styles.searchBtn}>
                        <Text style={styles.searchIcon}>🔎</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.chipRow}>
                    {filterChips.map((filter) => {
                        const isActive = activeFilter === filter;
                        const count = filter === "All Farms" ? null : counts[filter];

                        return (
                            <TouchableOpacity
                                key={filter}
                                onPress={() => setActiveFilter(filter)}
                                style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
                            >
                                <Text
                                    style={[
                                        styles.chipText,
                                        isActive ? styles.chipTextActive : styles.chipTextInactive,
                                    ]}
                                >
                                    {filter}
                                </Text>
                                {count !== null ? (
                                    <View
                                        style={[
                                            styles.chipCount,
                                            filter === "Urgent"
                                                ? styles.chipCountUrgent
                                                : styles.chipCountNormal,
                                        ]}
                                    >
                                        <Text style={styles.chipCountText}>{count}</Text>
                                    </View>
                                ) : null}
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <Text style={styles.foundText}>{filteredAssignments.length} Farms Found</Text>

                {filteredAssignments.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <View style={styles.cardTop}>
                            <Text style={styles.farmId}>Farm #{item.id}</Text>
                            <View style={[styles.statusPill, getStatusPillStyle(item.status)]}>
                                <Text style={styles.statusPillText}>{item.status}</Text>
                            </View>
                        </View>

                        <Text style={styles.farmerName}>{item.farmer}</Text>

                        <View style={styles.detailsRow}>
                            <View style={styles.detailCol}>
                                <Text style={styles.detailLabel}>Crop</Text>
                                <Text style={styles.detailValue}>{item.crop}</Text>
                            </View>
                            <View style={styles.detailCol}>
                                <Text style={styles.detailLabel}>Village</Text>
                                <Text style={styles.detailValue}>{item.village}</Text>
                            </View>
                        </View>

                        <View style={styles.detailsRow}>
                            <View style={styles.detailCol}>
                                <Text style={styles.detailLabel}>Assigned</Text>
                                <Text style={styles.detailValue}>{item.assigned}</Text>
                            </View>
                            <View style={styles.detailCol}>
                                <Text style={styles.detailLabel}>Deadline</Text>
                                <Text style={styles.deadlineValue}>{item.deadline}</Text>
                            </View>
                        </View>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={styles.viewBtn}
                                onPress={() => navigation.navigate("FarmDetails")}
                            >
                                <Text style={styles.viewBtnText}>View Details</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.startBtn, getStartVisitStyle(item.status)]}
                                onPress={() =>
                                    navigation.navigate("Verify", {
                                        task: {
                                            title: `Farm #${item.id} - ${item.crop}`,
                                            village: item.village,
                                            farmer: item.farmer,
                                            crop: item.crop,
                                            deadline: item.deadline,
                                        },
                                    })
                                }
                            >
                                <Text style={styles.startBtnText}>Start Visit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
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
    topBarTitle: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "700",
    },
    content: {
        padding: 16,
        paddingBottom: 28,
    },
    title: {
        fontSize: 34,
        fontWeight: "800",
        color: "#0f2f14",
    },
    subtitle: {
        marginTop: 6,
        fontSize: 18,
        color: "#52616f",
    },
    searchRow: {
        flexDirection: "row",
        marginTop: 14,
    },
    searchInput: {
        flex: 1,
        height: 52,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#c9d2ca",
        backgroundColor: "#fff",
        paddingHorizontal: 14,
        fontSize: 17,
        color: "#0f1d21",
    },
    searchBtn: {
        marginLeft: 10,
        width: 52,
        height: 52,
        borderRadius: 12,
        backgroundColor: "#38a753",
        alignItems: "center",
        justifyContent: "center",
    },
    searchIcon: {
        fontSize: 20,
        color: "#fff",
    },
    chipRow: {
        marginTop: 12,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    chip: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 24,
        flexDirection: "row",
        alignItems: "center",
    },
    chipActive: {
        backgroundColor: "#32a654",
    },
    chipInactive: {
        borderWidth: 1,
        borderColor: "#c1c9c1",
        backgroundColor: "#fff",
    },
    chipText: {
        fontSize: 15,
        fontWeight: "600",
    },
    chipTextActive: {
        color: "#fff",
    },
    chipTextInactive: {
        color: "#4f5d68",
    },
    chipCount: {
        marginLeft: 8,
        minWidth: 24,
        height: 24,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 6,
    },
    chipCountUrgent: {
        backgroundColor: "#ff4b4b",
    },
    chipCountNormal: {
        backgroundColor: "#8fbe8f",
    },
    chipCountText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },
    foundText: {
        marginTop: 14,
        marginBottom: 8,
        fontSize: 17,
        color: "#55626b",
        fontWeight: "700",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#dde4dd",
        padding: 16,
        marginBottom: 14,
    },
    cardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    farmId: {
        fontSize: 14,
        color: "#69747a",
    },
    statusPill: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    statusPillText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#10231b",
    },
    urgentPill: {
        backgroundColor: "#fde2e2",
    },
    newPill: {
        backgroundColor: "#dbeedd",
    },
    pendingPill: {
        backgroundColor: "#fff2cc",
    },
    farmerName: {
        marginTop: 6,
        fontSize: 32,
        color: "#102e16",
        fontWeight: "800",
    },
    detailsRow: {
        marginTop: 10,
        flexDirection: "row",
    },
    detailCol: {
        width: "50%",
    },
    detailLabel: {
        fontSize: 14,
        color: "#69747a",
    },
    detailValue: {
        marginTop: 4,
        fontSize: 28,
        color: "#0f1d21",
        fontWeight: "700",
    },
    deadlineValue: {
        marginTop: 4,
        fontSize: 28,
        color: "#ff4141",
        fontWeight: "800",
    },
    buttonRow: {
        marginTop: 16,
        flexDirection: "row",
        gap: 10,
    },
    viewBtn: {
        flex: 1,
        height: 48,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#32a654",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    viewBtnText: {
        color: "#2f9f4e",
        fontSize: 17,
        fontWeight: "600",
    },
    startBtn: {
        flex: 2,
        height: 48,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    startBtnNormal: {
        backgroundColor: "#39a853",
    },
    startBtnUrgent: {
        backgroundColor: "#ff4444",
    },
    startBtnText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "700",
    },
});
