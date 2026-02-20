import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import useRoleBackPolicy from "../../hooks/useRoleBackPolicy";
import colors from "../../theme/colors";

const tabItems = [
    { id: "Profile", icon: "account", label: "Identity" },
    { id: "Settings", icon: "cog", label: "App" },
    { id: "Documents", icon: "file-document", label: "Files" },
];

export default function ProfileScreen({ navigation }) {
    const { logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("Profile");
    useRoleBackPolicy({ navigation, homeRoute: "OfficerHome" });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("OfficerHome")} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Officer Profile</Text>
                <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
                    <Ionicons name="log-out-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* TABS */}
                <View style={styles.tabBar}>
                    {tabItems.map((item) => {
                        const active = activeTab === item.id;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[styles.tabBtn, active && styles.tabBtnActive]}
                                onPress={() => setActiveTab(item.id)}
                            >
                                <MaterialCommunityIcons name={item.icon} size={20} color={active ? "white" : colors.textSecondary} />
                                <Text style={[styles.tabLabel, active && { color: "white" }]}>{item.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {activeTab === "Profile" && <ProfilePanel navigation={navigation} />}
                {activeTab === "Settings" && <SettingsPanel />}
                {activeTab === "Documents" && <DocumentsPanel />}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

function ProfilePanel({ navigation }) {
    const info = [
        { icon: "badge-account-horizontal", label: "Employee ID", value: "OFF-2023-45" },
        { icon: "office-building", label: "Department", value: "Agriculture (Field)" },
        { icon: "map-marker-radius", label: "Assigned Zone", value: "Jaipur West" },
        { icon: "phone", label: "Phone", value: "+91 98765 43210" },
    ];

    return (
        <View style={styles.animatedPanel}>
            <View style={styles.heroCard}>
                <Image
                    source={{ uri: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=200" }}
                    style={styles.avatar}
                />
                <Text style={styles.userName}>Dr. Arjun Sharma</Text>
                <Text style={styles.userRole}>Senior Field Officer</Text>

                <View style={styles.expBadge}>
                    <MaterialCommunityIcons name="star-decagram" size={14} color={colors.accent} />
                    <Text style={styles.expText}>8 Years Experience</Text>
                </View>
            </View>

            <View style={styles.statsGrid}>
                <StatCard label="Visits" value="142" icon="truck-check" color={colors.primary} />
                <StatCard label="Rating" value="4.9" icon="star" color={colors.accent} />
                <StatCard label="Zone" value="#05" icon="map" color="#2196F3" />
            </View>

            <View style={styles.card}>
                <Text style={styles.cardSection}>Official Information</Text>
                {info.map((row, i) => (
                    <InfoRow key={i} icon={row.icon} label={row.label} value={row.value} last={i === info.length - 1} />
                ))}
            </View>

            <TouchableOpacity style={styles.primaryAction} onPress={() => navigation.navigate("Assignments")}>
                <Text style={styles.primaryActionText}>Manage Active Assignments</Text>
                <Ionicons name="arrow-forward" size={18} color="white" />
            </TouchableOpacity>
        </View>
    );
}

function SettingsPanel() {
    return (
        <View style={styles.animatedPanel}>
            <View style={styles.card}>
                <Text style={styles.cardSection}>Preferences</Text>
                <ToggleRow icon="bell-ring-outline" title="Field Alerts" sub="Real-time crop damage notifications" active />
                <ToggleRow icon="cloud-sync-outline" title="Auto Offline Sync" sub="Sync survey data on WiFi connecting" active />
                <ToggleRow icon="map-clock-outline" title="Location Tracking" sub="Allow tracking during visit hours" />
            </View>

            <View style={styles.card}>
                <Text style={styles.cardSection}>Account Safety</Text>
                <MenuRow icon="lock-reset" title="Change Password" />
                <MenuRow icon="shield-account-outline" title="Biometric Access" />
                <MenuRow icon="information-outline" title="App Version" value="v2.4.1" last />
            </View>
        </View>
    );
}

function DocumentsPanel() {
    const docs = [
        { title: "Zone ID Card", size: "1.2 MB", type: "PDF" },
        { title: "Verification Manual", size: "4.5 MB", type: "PDF" },
        { title: "Field Guidelines", size: "2.1 MB", type: "DOCX" },
    ];

    return (
        <View style={styles.animatedPanel}>
            <View style={styles.card}>
                <Text style={styles.cardSection}>My Documents</Text>
                {docs.map((doc, i) => (
                    <TouchableOpacity key={i} style={[styles.docItem, i === docs.length - 1 && { borderBottomWidth: 0 }]}>
                        <View style={styles.docIcon}>
                            <MaterialCommunityIcons name="file-pdf-box" size={24} color={colors.danger} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 15 }}>
                            <Text style={styles.docTitle}>{doc.title}</Text>
                            <Text style={styles.docMeta}>{doc.size} • {doc.type}</Text>
                        </View>
                        <Ionicons name="download-outline" size={20} color={colors.primary} />
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.uploadBtn}>
                <Ionicons name="cloud-upload" size={22} color="white" />
                <Text style={styles.uploadText}>Submit New Doc</Text>
            </TouchableOpacity>
        </View>
    );
}

const StatCard = ({ label, value, icon, color }) => (
    <View style={styles.statCard}>
        <View style={[styles.statIcon, { backgroundColor: color + "15" }]}>
            <MaterialCommunityIcons name={icon} size={20} color={color} />
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

const InfoRow = ({ icon, label, value, last }) => (
    <View style={[styles.infoRow, last && { borderBottomWidth: 0 }]}>
        <MaterialCommunityIcons name={icon} size={22} color={colors.primary} />
        <View style={{ marginLeft: 15 }}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    </View>
);

const ToggleRow = ({ icon, title, sub, active }) => (
    <View style={styles.row}>
        <MaterialCommunityIcons name={icon} size={24} color={colors.primary} />
        <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.rowTitle}>{title}</Text>
            <Text style={styles.rowSub}>{sub}</Text>
        </View>
        <Switch value={active} trackColor={{ false: "#DDD", true: colors.primary + "80" }} thumbColor={active ? colors.primary : "#999"} />
    </View>
);

const MenuRow = ({ icon, title, value, last }) => (
    <TouchableOpacity style={[styles.row, last && { borderBottomWidth: 0 }]}>
        <MaterialCommunityIcons name={icon} size={24} color={colors.primary} />
        <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.rowTitle}>{title}</Text>
        </View>
        {value ? <Text style={styles.rowValueText}>{value}</Text> : <Ionicons name="chevron-forward" size={18} color="#CCC" />}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { height: 70, backgroundColor: colors.primary, flexDirection: "row", alignItems: "center", paddingHorizontal: 20 },
    headerTitle: { color: "white", fontSize: 20, fontWeight: "bold", marginLeft: 15, flex: 1 },
    backBtn: { padding: 5 },
    logoutBtn: { padding: 5 },

    content: { padding: 20 },
    tabBar: { flexDirection: "row", backgroundColor: "white", borderRadius: 18, padding: 5, marginBottom: 25, elevation: 5 },
    tabBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 12, borderRadius: 15, gap: 8 },
    tabBtnActive: { backgroundColor: colors.primary },
    tabLabel: { fontSize: 13, fontWeight: "bold", color: colors.textSecondary },

    animatedPanel: { gap: 20 },
    heroCard: { backgroundColor: "white", borderRadius: 30, padding: 30, alignItems: "center", elevation: 10 },
    avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: colors.primary + "20" },
    userName: { fontSize: 24, fontWeight: "bold", color: colors.text, marginTop: 15 },
    userRole: { fontSize: 14, color: colors.primary, fontWeight: "600", marginTop: 2 },
    expBadge: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: colors.accent + "15", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10, marginTop: 12 },
    expText: { fontSize: 11, fontWeight: "bold", color: colors.accent },

    statsGrid: { flexDirection: "row", gap: 12 },
    statCard: { flex: 1, backgroundColor: "white", borderRadius: 20, padding: 15, alignItems: "center", elevation: 3 },
    statIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: "center", alignItems: "center", marginBottom: 8 },
    statValue: { fontSize: 20, fontWeight: "bold", color: colors.text },
    statLabel: { fontSize: 10, color: colors.textSecondary, textTransform: "uppercase", marginTop: 2 },

    card: { backgroundColor: "white", borderRadius: 24, padding: 20, elevation: 4 },
    cardSection: { fontSize: 16, fontWeight: "bold", color: colors.text, marginBottom: 20 },

    infoRow: { flexDirection: "row", alignItems: "center", paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: "#F5F5F5" },
    infoLabel: { fontSize: 11, color: colors.textSecondary, textTransform: "uppercase" },
    infoValue: { fontSize: 14, fontWeight: "bold", color: colors.text, marginTop: 2 },

    primaryAction: { backgroundColor: colors.primary, padding: 18, borderRadius: 18, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 12, elevation: 5 },
    primaryActionText: { color: "white", fontSize: 16, fontWeight: "bold" },

    row: { flexDirection: "row", alignItems: "center", paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: "#F5F5F5" },
    rowTitle: { fontSize: 15, color: colors.text, fontWeight: "500" },
    rowSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
    rowValueText: { fontSize: 14, color: colors.textSecondary, fontWeight: "bold" },

    docItem: { flexDirection: "row", alignItems: "center", paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: "#F5F5F5" },
    docIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: colors.danger + "10", justifyContent: "center", alignItems: "center" },
    docTitle: { fontSize: 15, fontWeight: "bold", color: colors.text },
    docMeta: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
    uploadBtn: { backgroundColor: colors.accent, padding: 18, borderRadius: 18, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 12 },
    uploadText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
