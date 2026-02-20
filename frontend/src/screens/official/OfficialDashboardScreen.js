import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Dimensions } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import useRoleBackPolicy from "../../hooks/useRoleBackPolicy";
import colors from "../../theme/colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function OfficialDashboardScreen({ navigation }) {
    const { logout } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setTasks([
            {
                id: "1",
                title: "Farm #A123 - Rice Crop",
                village: "Ramgarh",
                status: "Pending",
                time: "2 hours ago"
            },
            {
                id: "2",
                title: "Farm #B456 - Damage Report",
                village: "Sohna",
                status: "Urgent",
                time: "30 mins ago"
            },
            {
                id: "3",
                title: "Farm #C789 - Wheat",
                village: "Badshahpur",
                status: "Done",
                time: "Yesterday"
            },
        ]);
    }, []);

    useRoleBackPolicy({ navigation, homeRoute: "OfficerHome", isHome: true, onHomeBack: logout });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Officer Portal</Text>
                    <Text style={styles.headerSub}>Field Official Dashboard</Text>
                </View>
                <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
                    <Ionicons name="log-out-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* STATS SUMMARY */}
                <View style={styles.statsRow}>
                    <StatCard count="12" label="Assigned" color="#1976D2" icon="list-bullet" onPress={() => navigation.navigate("Assignments")} />
                    <StatCard count="5" label="Pending" color={colors.accent} icon="time" onPress={() => navigation.navigate("Assignments")} />
                    <StatCard count="47" label="Verified" color={colors.success} icon="checkmark-done" onPress={() => navigation.navigate("Reports")} />
                </View>

                {/* QUICK ACTIONS */}
                <Text style={styles.sectionTitle}>Field Operations</Text>
                <View style={styles.grid}>
                    <ActionCard
                        title="Start Visit"
                        sub="Verification"
                        icon="location"
                        color={colors.primary}
                        onPress={() => navigation.navigate("Verify")}
                    />
                    <ActionCard
                        title="Sync Data"
                        sub="Offline Reports"
                        icon="cloud-upload"
                        color="#7B1FA2"
                    />
                    <ActionCard
                        title="Assignments"
                        sub="My Worklist"
                        icon="clipboard"
                        color="#F57C00"
                        onPress={() => navigation.navigate("Assignments")}
                    />
                    <ActionCard
                        title="Visual Logs"
                        sub="Audit History"
                        icon="images"
                        color="#455A64"
                        onPress={() => navigation.navigate("Reports")}
                    />
                </View>

                {/* TASKS */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Priority Tasks</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Assignments")}>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>

                {tasks.map((task) => (
                    <TouchableOpacity
                        key={task.id}
                        style={styles.taskCard}
                        onPress={() => navigation.navigate("Verify", { task })}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.taskIcon, { backgroundColor: getStatusColor(task.status) + "15" }]}>
                            <FontAwesome5 name={task.status === "Urgent" ? "exclamation-triangle" : "map-marker-alt"} size={18} color={getStatusColor(task.status)} />
                        </View>
                        <View style={styles.taskInfo}>
                            <Text style={styles.taskTitle}>{task.title}</Text>
                            <Text style={styles.taskSub}>Village: {task.village} • {task.time}</Text>
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(task.status) + "15" }]}>
                            <Text style={[styles.statusText, { color: getStatusColor(task.status) }]}>{task.status}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

                {/* ALERTS */}
                <Text style={styles.sectionTitle}>System Alerts</Text>
                <View style={[styles.alert, { borderLeftColor: colors.danger }]}>
                    <Ionicons name="warning" size={20} color={colors.danger} />
                    <View style={styles.alertContent}>
                        <Text style={styles.alertTitle}>AI Mismatch Detected</Text>
                        <Text style={styles.alertDesc}>Farm #B456 ground report differs from AI analysis.</Text>
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const getStatusColor = (status) => {
    switch (status) {
        case "Urgent": return colors.danger;
        case "Done": return colors.success;
        default: return colors.accent;
    }
};

function StatCard({ count, label, color, icon, onPress }) {
    return (
        <TouchableOpacity style={styles.statCard} onPress={onPress}>
            <View style={[styles.statIcon, { backgroundColor: color + "15" }]}>
                <Ionicons name={icon} size={20} color={color} />
            </View>
            <Text style={[styles.statCount, { color }]}>{count}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </TouchableOpacity>
    );
}

function ActionCard({ title, sub, icon, color, onPress }) {
    return (
        <TouchableOpacity style={styles.actionCard} onPress={onPress} activeOpacity={0.8}>
            <View style={[styles.actionIcon, { backgroundColor: color + "15" }]}>
                <Ionicons name={icon} size={24} color={color} />
            </View>
            <View>
                <Text style={styles.actionTitle}>{title}</Text>
                <Text style={styles.actionSub}>{sub}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
        backgroundColor: colors.primary,
        padding: 24,
        paddingTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 6,
    },
    headerTitle: { color: "white", fontSize: 24, fontWeight: "bold" },
    headerSub: { color: "rgba(255,255,255,0.8)", fontSize: 14, marginTop: 4 },
    logoutBtn: { padding: 8, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 12 },

    scroll: { padding: 20 },

    statsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 25 },
    statCard: { backgroundColor: "white", width: "31%", padding: 15, borderRadius: 20, alignItems: "center", elevation: 3 },
    statIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: "center", alignItems: "center", marginBottom: 6 },
    statCount: { fontSize: 20, fontWeight: "bold" },
    statLabel: { fontSize: 11, color: colors.textSecondary },

    sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10, marginBottom: 12 },
    sectionTitle: { fontSize: 18, fontWeight: "bold", color: colors.text, marginBottom: 15 },
    seeAll: { color: colors.primary, fontWeight: "bold" },

    grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 10 },
    actionCard: {
        backgroundColor: "white",
        width: "48%",
        padding: 16,
        borderRadius: 20,
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",
        elevation: 3,
    },
    actionIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: "center", alignItems: "center", marginRight: 12 },
    actionTitle: { fontSize: 14, fontWeight: "bold", color: colors.text },
    actionSub: { fontSize: 11, color: colors.textSecondary },

    taskCard: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        elevation: 2,
    },
    taskIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: "center", alignItems: "center", marginRight: 15 },
    taskInfo: { flex: 1 },
    taskTitle: { fontSize: 15, fontWeight: "bold", color: colors.text },
    taskSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
    statusText: { fontSize: 11, fontWeight: "bold" },

    alert: {
        backgroundColor: "white",
        flexDirection: "row",
        padding: 16,
        borderRadius: 15,
        borderLeftWidth: 4,
        elevation: 2,
        alignItems: "center",
    },
    alertContent: { marginLeft: 12 },
    alertTitle: { fontSize: 14, fontWeight: "bold", color: colors.text },
    alertDesc: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
});
