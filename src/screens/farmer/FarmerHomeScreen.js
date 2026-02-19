import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function FarmerHomeScreen({ navigation }) {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Farmer Dashboard</Text>
            </View>

            {/* WEATHER CARD */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Today{"'"}s Weather</Text>

                <View style={styles.weatherRow}>
                    <View>
                        <Text style={styles.temp}>28°C</Text>
                        <Text style={styles.sub}>Partly Cloudy</Text>
                    </View>

                    <View style={{ alignItems: "flex-end" }}>
                        <Text>Rainfall: 0 mm</Text>
                        <Text>Humidity: 65%</Text>
                        <Text>Wind: 12 km/h</Text>
                    </View>
                </View>
            </View>

            {/* ALERT */}
            <View style={styles.alert}>
                <Text style={{ color: "#7a5b00" }}>
                    ⚠ Possible rain in next 24 hours
                </Text>
            </View>

            {/* INSURANCE */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Insurance Coverage</Text>

                <View style={styles.rowBetween}>
                    <Text>Scheme</Text>
                    <Text style={styles.bold}>PMFBY - Kharif</Text>
                </View>

                <View style={styles.rowBetween}>
                    <Text>Sum Insured</Text>
                    <Text style={styles.bold}>₹ 40,000</Text>
                </View>

                <View style={styles.rowBetween}>
                    <Text>Premium</Text>
                    <Text style={styles.bold}>₹ 2,000</Text>
                </View>

                <View style={styles.rowBetween}>
                    <Text>Valid Till</Text>
                    <Text style={styles.bold}>Dec 2024</Text>
                </View>

                <TouchableOpacity style={styles.coverageBtn}>
                    <Text style={{ color: "#fff" }}>View Coverage Details</Text>
                </TouchableOpacity>
            </View>

            {/* QUICK ACTIONS */}
            <Text style={styles.sectionTitle}>Quick Actions</Text>

            <View style={styles.grid}>
                <ActionCard
                    icon="camera"
                    title="Capture Crop"
                    sub="Upload crop image"
                    onPress={() => navigation.navigate("CaptureIndex")}
                />

                <ActionCard
                    icon="chart-bar"
                    title="Track Status"
                    sub="Check claim progress"
                    onPress={() => navigation.navigate("Status")}
                />

                <ActionCard
                    icon="phone"
                    title="Call Support"
                    sub="Contact officer"
                    onPress={() => { }}
                />

                <ActionCard
                    icon="history"
                    title="History"
                    sub="View submissions"
                    onPress={() => navigation.navigate("History")}
                />
            </View>

            {/* RECENT ACTIVITY */}
            <Text style={styles.sectionTitle}>Recent Activity</Text>

            <View style={styles.activityCard}>
                <View style={styles.rowBetween}>
                    <View style={styles.row}>
                        <Ionicons name="checkmark-circle" size={22} color="green" />
                        <Text style={styles.activityText}>Image Submitted</Text>
                    </View>
                    <Text style={{ color: "orange" }}>Processing</Text>
                </View>
                <Text style={styles.small}>2 hours ago</Text>
            </View>

            <View style={styles.activityCard}>
                <View style={styles.rowBetween}>
                    <View style={styles.row}>
                        <Ionicons name="leaf" size={20} color="green" />
                        <Text style={styles.activityText}>AI Analysis Complete</Text>
                    </View>
                    <Text style={{ color: "green" }}>Healthy</Text>
                </View>
                <Text style={styles.small}>Yesterday</Text>
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

function ActionCard({ icon, title, sub, onPress }) {
    return (
        <TouchableOpacity style={styles.actionCard} onPress={onPress} activeOpacity={0.82}>
            <View style={styles.iconCircle}>
                <FontAwesome5 name={icon} size={18} color="#fff" />
            </View>
            <Text style={styles.actionTitle}>{title}</Text>
            <Text style={styles.small}>{sub}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#eef2ee" },

    header: {
        backgroundColor: "#3aa655",
        padding: 18,
    },

    headerText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    card: {
        backgroundColor: "#fff",
        margin: 12,
        padding: 15,
        borderRadius: 10,
        elevation: 2,
    },

    alert: {
        marginHorizontal: 12,
        backgroundColor: "#fff3cd",
        padding: 12,
        borderRadius: 8,
    },

    sectionTitle: {
        marginLeft: 12,
        marginTop: 10,
        marginBottom: 6,
        fontSize: 16,
        fontWeight: "bold",
    },

    weatherRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },

    temp: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#3aa655",
    },

    sub: { color: "#666", marginTop: 3 },

    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 4,
    },

    bold: { fontWeight: "bold" },

    coverageBtn: {
        backgroundColor: "#7fbf7f",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },

    actionCard: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 12,
        alignItems: "center",
        elevation: 2,
    },

    iconCircle: {
        backgroundColor: "#3aa655",
        width: 45,
        height: 45,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 6,
    },

    actionTitle: { fontWeight: "bold" },

    activityCard: {
        backgroundColor: "#fff",
        margin: 12,
        padding: 12,
        borderRadius: 10,
    },

    activityText: { marginLeft: 6, fontWeight: "bold" },

    small: { color: "#777", fontSize: 12 },

    row: { flexDirection: "row", alignItems: "center" },
});
