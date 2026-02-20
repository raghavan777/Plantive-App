import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Dimensions,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import useRoleBackPolicy from "../../hooks/useRoleBackPolicy";
import colors from "../../theme/colors";

const { width } = Dimensions.get("window");

export default function FarmerHomeScreen({ navigation }) {
    const { logout } = useContext(AuthContext);
    useRoleBackPolicy({ navigation, homeRoute: "Home", isHome: true, onHomeBack: logout });

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerGreeting}>Hello, Farmer</Text>
                    <Text style={styles.headerSub}>Let{"'"}s check your farms today</Text>
                </View>
                <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
                    <Ionicons name="log-out-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* WEATHER CARD */}
                <View style={[styles.mainCard, { backgroundColor: "#81C784" }]}>
                    <View style={styles.weatherIcon}>
                        <Ionicons name="partly-sunny" size={50} color="white" />
                    </View>
                    <View style={styles.weatherInfo}>
                        <Text style={styles.sectionTitleWhite}>Today{"'"}s Weather</Text>
                        <View style={styles.weatherRow}>
                            <View>
                                <Text style={styles.temp}>28°C</Text>
                                <Text style={styles.weatherDesc}>Partly Cloudy</Text>
                            </View>
                            <View style={styles.weatherStats}>
                                <Text style={styles.statText}>Rain: 0 mm</Text>
                                <Text style={styles.statText}>Humidity: 65%</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* ALERT */}
                <View style={styles.alert}>
                    <Ionicons name="warning" size={20} color="#BF360C" />
                    <Text style={styles.alertText}>
                        Moderate rain expected in the next 24 hours.
                    </Text>
                </View>

                {/* QUICK ACTIONS GRID */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Farm Services</Text>
                </View>

                <View style={styles.grid}>
                    <ActionCard
                        icon="camera"
                        color="#2E7D32"
                        title="Capture Crop"
                        sub="Upload image"
                        onPress={() => navigation.navigate("CaptureIndex")}
                    />

                    <ActionCard
                        icon="search-location"
                        color="#F57C00"
                        title="Track Claim"
                        sub="Check status"
                        onPress={() => navigation.navigate("Status")}
                    />

                    <ActionCard
                        icon="history"
                        color="#1976D2"
                        title="Submission"
                        sub="View history"
                        onPress={() => navigation.navigate("History")}
                    />

                    <ActionCard
                        icon="headset"
                        color="#7B1FA2"
                        title="Support"
                        sub="Get help"
                        onPress={() => { }}
                    />
                </View>

                {/* INSURANCE */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Insurance Summary</Text>
                </View>
                <View style={styles.card}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.label}>Active Scheme</Text>
                        <Text style={styles.value}>PMFBY - Kharif 2024</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.rowBetween}>
                        <Text style={styles.label}>Sum Insured</Text>
                        <Text style={[styles.value, { color: colors.primary }]}>₹ 40,000</Text>
                    </View>
                    <View style={styles.rowBetween}>
                        <Text style={styles.label}>Premium Paid</Text>
                        <Text style={styles.value}>₹ 2,000</Text>
                    </View>

                    <TouchableOpacity style={styles.coverageBtn}>
                        <Text style={styles.coverageBtnText}>View Full Coverage</Text>
                        <Ionicons name="chevron-forward" size={16} color="white" />
                    </TouchableOpacity>
                </View>

                {/* RECENT ACTIVITY */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Activities</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.activityCard}>
                    <View style={styles.activityItem}>
                        <View style={[styles.activityIcon, { backgroundColor: "#E8F5E9" }]}>
                            <Ionicons name="checkmark-circle" size={24} color="#2E7D32" />
                        </View>
                        <View style={styles.activityInfo}>
                            <Text style={styles.activityTitle}>Crop Image Verified</Text>
                            <Text style={styles.activityTime}>2 hours ago</Text>
                        </View>
                        <Text style={styles.activityStatus}>Success</Text>
                    </View>

                    <View style={styles.activityItem}>
                        <View style={[styles.activityIcon, { backgroundColor: "#FFF3E0" }]}>
                            <Ionicons name="leaf" size={24} color="#E65100" />
                        </View>
                        <View style={styles.activityInfo}>
                            <Text style={styles.activityTitle}>AI Analysis Complete</Text>
                            <Text style={styles.activityTime}>Yesterday</Text>
                        </View>
                        <Text style={[styles.activityStatus, { color: "#E65100" }]}>Healthy</Text>
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

function ActionCard({ icon, color, title, sub, onPress }) {
    return (
        <TouchableOpacity style={styles.actionCard} onPress={onPress} activeOpacity={0.8}>
            <View style={[styles.iconCircle, { backgroundColor: color + "15" }]}>
                <FontAwesome5 name={icon} size={22} color={color} />
            </View>
            <Text style={styles.actionTitle}>{title}</Text>
            <Text style={styles.actionSub}>{sub}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
    container: { flex: 1, paddingHorizontal: 16 },

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
    headerGreeting: { color: "white", fontSize: 24, fontWeight: "bold" },
    headerSub: { color: "rgba(255,255,255,0.8)", fontSize: 14, marginTop: 4 },
    logoutBtn: { padding: 8, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 12 },

    mainCard: {
        marginTop: 20,
        borderRadius: 24,
        padding: 24,
        flexDirection: "row",
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    weatherIcon: { justifyContent: "center", marginRight: 20 },
    weatherInfo: { flex: 1 },
    weatherRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginTop: 10 },
    temp: { fontSize: 40, fontWeight: "bold", color: "white" },
    weatherDesc: { color: "white", fontSize: 16, opacity: 0.9 },
    weatherStats: { alignItems: "flex-end" },
    statText: { color: "white", fontSize: 12, opacity: 0.8, marginBottom: 2 },

    alert: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFEBE5",
        padding: 14,
        borderRadius: 16,
        marginTop: 16,
        borderWidth: 1,
        borderColor: "#FFCCBC",
    },
    alertText: { color: "#BF360C", marginLeft: 10, fontSize: 13, fontWeight: "600" },

    sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 24, marginBottom: 12 },
    sectionTitle: { fontSize: 18, fontWeight: "bold", color: colors.text },
    sectionTitleWhite: { fontSize: 18, fontWeight: "bold", color: "white" },
    seeAll: { color: colors.primary, fontWeight: "700", fontSize: 14 },

    grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
    actionCard: {
        width: (width - 44) / 2,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        marginBottom: 12,
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    iconCircle: { width: 56, height: 56, borderRadius: 28, justifyContent: "center", alignItems: "center", marginBottom: 12 },
    actionTitle: { fontSize: 15, fontWeight: "bold", color: colors.text },
    actionSub: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },

    card: {
        backgroundColor: "white",
        borderRadius: 24,
        padding: 20,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    rowBetween: { flexDirection: "row", justifyContent: "space-between", marginVertical: 6, alignItems: "center" },
    label: { color: colors.textSecondary, fontSize: 14 },
    value: { fontWeight: "bold", color: colors.text, fontSize: 15 },
    divider: { height: 1, backgroundColor: colors.border, marginVertical: 10, opacity: 0.5 },
    coverageBtn: {
        backgroundColor: colors.primary,
        padding: 14,
        borderRadius: 15,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
        gap: 8,
    },
    coverageBtnText: { color: "white", fontWeight: "bold", fontSize: 15 },

    activityCard: { backgroundColor: "white", borderRadius: 24, padding: 8, elevation: 2 },
    activityItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    activityIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: "center", alignItems: "center" },
    activityInfo: { flex: 1, marginLeft: 12 },
    activityTitle: { fontSize: 15, fontWeight: "600", color: colors.text },
    activityTime: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
    activityStatus: { fontSize: 14, fontWeight: "700", color: colors.primary },
});
