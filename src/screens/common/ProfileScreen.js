import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";

const tabItems = ["Profile", "Settings", "Documents"];

export default function ProfileScreen({ navigation }) {
    const { logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("Profile");

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.topBarTitle}>Profile</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.headerBar}>
                    <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={() => navigation.navigate("OfficerHome")}
                    >
                        <Ionicons name="arrow-back" size={24} color="#0f3216" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <TouchableOpacity style={styles.iconBtn} onPress={logout}>
                        <Ionicons name="log-out-outline" size={24} color="#f39b08" />
                    </TouchableOpacity>
                </View>

                <View style={styles.tabRow}>
                    {tabItems.map((item) => {
                        const selected = activeTab === item;
                        const iconName =
                            item === "Profile"
                                ? "person"
                                : item === "Settings"
                                    ? "settings"
                                    : "folder";

                        return (
                            <TouchableOpacity
                                key={item}
                                style={[styles.tabBtn, selected && styles.tabBtnActive]}
                                onPress={() => setActiveTab(item)}
                            >
                                <Ionicons
                                    name={iconName}
                                    size={20}
                                    color={selected ? "#2ea854" : "#5c6670"}
                                />
                                <Text style={[styles.tabText, selected && styles.tabTextActive]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {activeTab === "Profile" ? <ProfilePanel /> : null}
                {activeTab === "Settings" ? <SettingsPanel navigation={navigation} /> : null}
                {activeTab === "Documents" ? <DocumentsPanel /> : null}
            </ScrollView>
        </View>
    );
}

function ProfilePanel() {
    return (
        <View style={styles.card}>
            <View style={styles.personRow}>
                <Image
                    source={{
                        uri: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=200",
                    }}
                    style={styles.avatar}
                />
                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>Dr. Arjun Sharma</Text>
                    <Text style={styles.role}>Agriculture Field Officer</Text>
                    <Text style={styles.rating}>⭐ 4.7/5 • 8 years experience</Text>
                </View>
            </View>

            <InfoItem icon="id-card" label="Employee ID" value="AGRI-OFF-2023-045" />
            <InfoItem icon="business" label="Department" value="Department of Agriculture" />
            <InfoItem icon="location" label="Zone" value="Chennai South Zone" />
            <InfoItem icon="call" label="Phone" value="+91 98765 43210" />
            <InfoItem icon="mail" label="Email" value="arjun.sharma@agri.tn.gov.in" />
        </View>
    );
}

function InfoItem({ icon, label, value }) {
    return (
        <View style={styles.infoRow}>
            <View style={styles.infoIconWrap}>
                <Ionicons name={icon} size={18} color="#36a457" />
            </View>
            <View>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value}</Text>
            </View>
        </View>
    );
}

function SettingsPanel({ navigation }) {
    return (
        <View style={styles.settingsWrap}>
            <View style={styles.statsRow}>
                <StatBox value="145" label="Total Visits" bg="#53a95f" />
                <StatBox value="132" label="Completed" bg="#00be00" />
                <StatBox value="4.7" label="Rating" bg="#1976d3" />
            </View>

            <View style={styles.actionsRow}>
                <TouchableOpacity
                    style={[styles.actionBtn, styles.assignBtn]}
                    onPress={() => navigation.navigate("Assignments")}
                >
                    <Ionicons name="list" size={20} color="#fff" />
                    <Text style={styles.actionBtnText}>View Assignments</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionBtn, styles.syncBtn]}>
                    <Ionicons name="sync" size={20} color="#fff" />
                    <Text style={styles.actionBtnText}>Sync Now</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.helpCard}>
                <Text style={styles.helpTitle}>Need Help?</Text>
                <View style={styles.helpRow}>
                    <HelpItem icon="help-circle" label="FAQs" color="#1d74d6" />
                    <HelpItem icon="call" label="Support" color="#0aa53d" />
                    <HelpItem icon="mail" label="Email" color="#35a55a" />
                    <HelpItem icon="document-text" label="Manual" color="#f39b08" />
                </View>
            </View>
        </View>
    );
}

function StatBox({ value, label, bg }) {
    return (
        <View style={[styles.statBox, { backgroundColor: bg }]}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );
}

function HelpItem({ icon, label, color }) {
    return (
        <TouchableOpacity style={styles.helpItem}>
            <Ionicons name={icon} size={28} color={color} />
            <Text style={styles.helpText}>{label}</Text>
        </TouchableOpacity>
    );
}

function DocumentsPanel() {
    return (
        <View style={styles.docCard}>
            <Text style={styles.docTitle}>Documents</Text>
            <Text style={styles.docText}>ID Card, Certificates, and policy documents will appear here.</Text>
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
        fontSize: 36,
        fontWeight: "700",
    },
    content: {
        paddingBottom: 24,
    },
    headerBar: {
        marginTop: 12,
        marginHorizontal: 10,
        borderRadius: 16,
        minHeight: 64,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 14,
    },
    iconBtn: {
        width: 34,
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 24,
        color: "#0f3318",
        fontWeight: "700",
    },
    tabRow: {
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: "#fff",
        borderRadius: 14,
        flexDirection: "row",
        padding: 4,
    },
    tabBtn: {
        width: "33.33%",
        minHeight: 46,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },
    tabBtnActive: {
        backgroundColor: "#e3ece6",
    },
    tabText: {
        color: "#5f6a73",
        fontSize: 17,
        fontWeight: "500",
    },
    tabTextActive: {
        color: "#2ea854",
        fontWeight: "700",
    },
    card: {
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: "#fff",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#dbe1db",
        padding: 14,
    },
    personRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    avatar: {
        width: 84,
        height: 84,
        borderRadius: 42,
        marginRight: 12,
    },
    name: {
        fontSize: 40,
        fontWeight: "800",
        color: "#0f2f14",
    },
    role: {
        marginTop: 3,
        fontSize: 34,
        color: "#37aa57",
    },
    rating: {
        marginTop: 4,
        fontSize: 30,
        color: "#4e5962",
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
    },
    infoIconWrap: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#e0eee4",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    infoLabel: {
        fontSize: 14,
        color: "#677278",
    },
    infoValue: {
        marginTop: 2,
        fontSize: 17,
        fontWeight: "700",
        color: "#16321a",
    },
    settingsWrap: {
        marginTop: 10,
        marginHorizontal: 10,
        gap: 10,
    },
    statsRow: {
        flexDirection: "row",
        gap: 10,
    },
    statBox: {
        flex: 1,
        borderRadius: 12,
        minHeight: 84,
        justifyContent: "center",
        alignItems: "center",
    },
    statValue: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "800",
    },
    statLabel: {
        color: "#fff",
        fontSize: 18,
        marginTop: 3,
    },
    actionsRow: {
        flexDirection: "row",
        gap: 10,
    },
    actionBtn: {
        flex: 1,
        minHeight: 52,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },
    assignBtn: {
        backgroundColor: "#56a55f",
    },
    syncBtn: {
        backgroundColor: "#88b27e",
    },
    actionBtnText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "700",
    },
    helpCard: {
        backgroundColor: "#fff",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#dbe1db",
        paddingVertical: 16,
        paddingHorizontal: 12,
    },
    helpTitle: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "700",
        color: "#0f2f14",
    },
    helpRow: {
        marginTop: 14,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    helpItem: {
        width: "24%",
        alignItems: "center",
    },
    helpText: {
        marginTop: 6,
        fontSize: 14,
        color: "#606a72",
    },
    docCard: {
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 14,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#dbe1db",
        padding: 16,
    },
    docTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#0f2f14",
    },
    docText: {
        marginTop: 8,
        fontSize: 15,
        color: "#606a72",
    },
});
