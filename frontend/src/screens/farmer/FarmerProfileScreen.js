import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useContext } from "react";
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import useRoleBackPolicy from "../../hooks/useRoleBackPolicy";
import colors from "../../theme/colors";

export default function FarmerProfileScreen({ navigation }) {
    const { logout } = useContext(AuthContext);
    useRoleBackPolicy({ navigation, homeRoute: "Home" });

    const [pushEnabled, setPushEnabled] = useState(true);
    const [autoCapture, setAutoCapture] = useState(true);

    const InfoItem = ({ label, value, icon, color }) => (
        <View style={styles.infoItem}>
            <View style={[styles.infoIcon, { backgroundColor: color + "15" }]}>
                <Ionicons name={icon} size={20} color={color} />
            </View>
            <View>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value}</Text>
            </View>
        </View>
    );

    const SettingItem = ({ title, subtitle, icon, value, onValueChange, type = "switch" }) => (
        <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                    <Ionicons name={icon} size={22} color={colors.primary} />
                </View>
                <View>
                    <Text style={styles.settingTitle}>{title}</Text>
                    <Text style={styles.settingSub}>{subtitle}</Text>
                </View>
            </View>
            {type === "switch" && (
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    trackColor={{ false: "#D1D1D1", true: colors.primary + "80" }}
                    thumbColor={value ? colors.primary : "#F4F4F4"}
                />
            )}
            {type === "chevron" && (
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Profile</Text>
                <TouchableOpacity style={styles.editBtn}>
                    <Feather name="edit" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                {/* PROFILE HEADER */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>RK</Text>
                        </View>
                        <TouchableOpacity style={styles.cameraBadge}>
                            <Ionicons name="camera" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>Rajesh Kumar</Text>
                    <Text style={styles.userRole}>Small Farmer • ID: PMFBY-RJ-00123</Text>

                    <View style={styles.locationTag}>
                        <Ionicons name="location" size={14} color={colors.primary} />
                        <Text style={styles.locationText}>Ramgarh, Gurugram, Haryana</Text>
                    </View>
                </View>

                {/* STATS QUICK VIEW */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statVal}>12</Text>
                        <Text style={styles.statLbl}>Submissions</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={[styles.statVal, { color: colors.success }]}>08</Text>
                        <Text style={styles.statLbl}>Approved</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={[styles.statVal, { color: colors.accent }]}>₹37K</Text>
                        <Text style={styles.statLbl}>Claimed</Text>
                    </View>
                </View>

                {/* PERSONAL INFO */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Personal Details</Text>
                    <InfoItem label="Mobile Number" value="+91 98765 43210" icon="call-outline" color="#1976D2" />
                    <InfoItem label="Aadhaar Number" value="XXXX-XXXX-1234" icon="card-outline" color="#7B1FA2" />
                    <InfoItem label="Bank Account" value="SBI • XXXX1234" icon="business-outline" color="#F57C00" />
                </View>

                {/* SETTINGS */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>App Settings</Text>
                    <SettingItem
                        title="Push Notifications"
                        subtitle="Alerts for claim status changes"
                        icon="notifications-outline"
                        value={pushEnabled}
                        onValueChange={setPushEnabled}
                    />
                    <SettingItem
                        title="Smart Auto-Capture"
                        subtitle="Helpful for quality crop images"
                        icon="camera-outline"
                        value={autoCapture}
                        onValueChange={setAutoCapture}
                    />
                    <SettingItem
                        title="App Language"
                        subtitle="Current: English (Change to Hindi)"
                        icon="language-outline"
                        type="chevron"
                    />
                </View>

                {/* SUPPORT & LOGOUT */}
                <View style={[styles.card, { marginBottom: 40 }]}>
                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons name="help-circle-outline" size={24} color={colors.text} />
                        <Text style={styles.menuText}>Help & Support</Text>
                        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.menuItem} onPress={logout}>
                        <Ionicons name="log-out-outline" size={24} color={colors.danger} />
                        <Text style={[styles.menuText, { color: colors.danger }]}>Logout</Text>
                    </TouchableOpacity>
                </View>
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
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    headerTitle: { color: "white", fontSize: 20, fontWeight: "bold" },
    backBtn: { padding: 5 },
    editBtn: { padding: 5 },
    scroll: { padding: 20 },
    profileSection: { alignItems: "center", marginBottom: 30 },
    avatarContainer: { position: "relative", marginBottom: 15 },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    avatarText: { fontSize: 36, fontWeight: "bold", color: colors.primary },
    cameraBadge: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: colors.primary,
        padding: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "white",
    },
    userName: { fontSize: 24, fontWeight: "bold", color: colors.text },
    userRole: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
    locationTag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 12,
        elevation: 2,
    },
    locationText: { fontSize: 13, color: colors.primary, marginLeft: 6, fontWeight: "600" },

    statsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 25 },
    statCard: {
        backgroundColor: "white",
        width: "31%",
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
        elevation: 3,
    },
    statVal: { fontSize: 20, fontWeight: "bold", color: colors.primary },
    statLbl: { fontSize: 11, color: colors.textSecondary, marginTop: 4 },

    card: { backgroundColor: "white", borderRadius: 24, padding: 20, marginBottom: 20, elevation: 4 },
    cardTitle: { fontSize: 18, fontWeight: "bold", color: colors.text, marginBottom: 15 },

    infoItem: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
    infoIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center", marginRight: 15 },
    infoLabel: { fontSize: 12, color: colors.textSecondary },
    infoValue: { fontSize: 15, fontWeight: "700", color: colors.text, marginTop: 2 },

    settingItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
    settingLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
    settingIcon: { marginRight: 15 },
    settingTitle: { fontSize: 16, fontWeight: "600", color: colors.text },
    settingSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },

    menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
    menuText: { flex: 1, fontSize: 16, fontWeight: "600", color: colors.text, marginLeft: 15 },
    divider: { height: 1, backgroundColor: colors.border, marginVertical: 10, opacity: 0.5 },
});
