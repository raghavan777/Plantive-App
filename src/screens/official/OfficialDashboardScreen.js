import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function OfficialDashboardScreen({ navigation }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // TODO → Replace with API later
        setTasks([
            {
                id: "1",
                title: "Farm #A123 - Rice Crop",
                village: "Ramgarh",
                status: "Pending",
            },
            {
                id: "2",
                title: "Farm #B456 - Damage Report",
                village: "Sohna",
                status: "Urgent",
            },
            {
                id: "3",
                title: "Farm #C789 - Wheat",
                village: "Badshahpur",
                status: "Done",
            },
        ]);
    }, []);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* HEADER */}
            <Text style={styles.header}>Officer Dashboard</Text>

            {/* STATS CARDS */}
            <View style={styles.statsRow}>
                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>12</Text>
                    <Text style={styles.statText}>Assigned Farms</Text>
                </View>

                <View style={[styles.statCard, styles.urgentCard]}>
                    <Text style={[styles.statNumber, { color: "#d32f2f" }]}>5</Text>
                    <Text style={styles.statText}>Pending Verifications</Text>
                </View>

                <View style={styles.statCard}>
                    <Text style={styles.statNumber}>47</Text>
                    <Text style={styles.statText}>Completed Reports</Text>
                </View>
            </View>

            {/* QUICK ACTIONS */}
            <Text style={styles.sectionTitle}>Quick Actions</Text>

            <View style={styles.grid}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate("Verify")}
                >
                    <Text style={styles.cardIcon}>📍</Text>
                    <Text style={styles.cardTitle}>Start Visit</Text>
                    <Text style={styles.cardDesc}>Begin farm verification</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <Text style={styles.cardIcon}>📱</Text>
                    <Text style={styles.cardTitle}>Sync Data</Text>
                    <Text style={styles.cardDesc}>Upload offline reports</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <Text style={styles.cardIcon}>📋</Text>
                    <Text style={styles.cardTitle}>Assignments</Text>
                    <Text style={styles.cardDesc}>View assigned farms</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card}>
                    <Text style={styles.cardIcon}>📊</Text>
                    <Text style={styles.cardTitle}>Reports</Text>
                    <Text style={styles.cardDesc}>View past visits</Text>
                </TouchableOpacity>
            </View>

            {/* TODAY TASKS */}
            <Text style={styles.sectionTitle}>Today{"'"}s Tasks</Text>

            {tasks.map((task) => (
                <TouchableOpacity
                    key={task.id}
                    style={styles.taskCard}
                    onPress={() => navigation.navigate("Verify", { task })}
                >
                    <View>
                        <Text style={styles.taskTitle}>{task.title}</Text>
                        <Text style={styles.taskSub}>Village: {task.village}</Text>
                    </View>

                    <Text
                        style={[
                            styles.status,
                            task.status === "Urgent"
                                ? styles.urgent
                                : task.status === "Done"
                                    ? styles.done
                                    : styles.pending,
                        ]}
                    >
                        {task.status}
                    </Text>
                </TouchableOpacity>
            ))}

            {/* NOTIFICATIONS */}
            <Text style={styles.sectionTitle}>Notifications</Text>

            <View style={styles.notification}>
                <Text style={styles.notificationTitle}>New Assignment</Text>
                <Text>Farm #D101 assigned to you</Text>
            </View>

            <View style={styles.notification}>
                <Text style={styles.notificationTitle}>AI Mismatch Alert</Text>
                <Text>Farm #B456 needs re-check</Text>
            </View>

            <View style={styles.notification}>
                <Text style={styles.notificationTitle}>Sync Successful</Text>
                <Text>3 reports uploaded</Text>
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f7f5",
        padding: 16,
    },

    header: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1b5e20",
        marginBottom: 15,
    },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    statCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        width: "32%",
        alignItems: "center",
        elevation: 3,
    },

    urgentCard: {
        borderWidth: 1,
        borderColor: "#d32f2f",
    },

    statNumber: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2e7d32",
    },

    statText: {
        fontSize: 12,
        textAlign: "center",
        marginTop: 4,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        color: "#1b5e20",
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    card: {
        backgroundColor: "#fff",
        width: "48%",
        padding: 18,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 12,
        elevation: 2,
    },

    cardIcon: {
        fontSize: 28,
        marginBottom: 6,
    },

    cardTitle: {
        fontWeight: "bold",
        color: "#2e7d32",
    },

    cardDesc: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
    },

    taskCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 2,
    },

    taskTitle: {
        fontWeight: "bold",
    },

    taskSub: {
        fontSize: 12,
        color: "#666",
    },

    status: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        fontSize: 12,
        fontWeight: "bold",
    },

    pending: {
        backgroundColor: "#fff3cd",
        color: "#856404",
    },

    urgent: {
        backgroundColor: "#ffebee",
        color: "#c62828",
    },

    done: {
        backgroundColor: "#e8f5e9",
        color: "#2e7d32",
    },

    notification: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 1,
    },

    notificationTitle: {
        fontWeight: "bold",
        marginBottom: 2,
    },
});
