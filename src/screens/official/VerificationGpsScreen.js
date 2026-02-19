import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function VerificationGpsScreen({ navigation }) {
    const distance = 13779;
    const canProceed = distance <= 100;

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>verification/gps</Text>
            </View>

            <View style={styles.headerBar}>
                <TouchableOpacity
                    style={styles.iconBtn}
                    onPress={() => navigation.navigate("FarmDetails")}
                >
                    <Ionicons name="arrow-back" size={24} color="#0f3216" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>GPS Verification</Text>
                <View style={styles.iconBtn} />
            </View>

            <View style={styles.card}>
                <View style={[styles.statusCircle, canProceed ? styles.okCircle : styles.badCircle]}>
                    <Ionicons
                        name={canProceed ? "checkmark" : "close"}
                        size={34}
                        color={canProceed ? "#0ea113" : "#ff6a6a"}
                    />
                </View>

                <Text style={styles.statusTitle}>Location Status</Text>
                <Text style={[styles.statusText, canProceed ? styles.okText : styles.badText]}>
                    {canProceed
                        ? "Perfect! You are near the farm location"
                        : `Too far! You are ${distance} meters away`}
                </Text>

                <View style={styles.infoStrip}>
                    <Text style={styles.infoLabel}>Distance from Farm:</Text>
                    <Text style={[styles.infoValue, canProceed ? styles.okText : styles.badText]}>
                        {" "}
                        {distance} meters
                    </Text>
                </View>

                <View style={styles.infoBlock}>
                    <View style={styles.infoRow}>
                        <Ionicons name="navigate" size={18} color="#5f6971" />
                        <Text style={styles.rowLabel}>Target Coordinates:</Text>
                    </View>
                    <Text style={styles.rowValue}>13.082700, 80.270700</Text>
                </View>

                <View style={styles.infoBlock}>
                    <View style={styles.infoRow}>
                        <Ionicons name="locate" size={18} color="#5f6971" />
                        <Text style={styles.rowLabel}>Your Location:</Text>
                    </View>
                    <Text style={styles.rowValue}>12.984241, 80.193473</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.refreshBtn}>
                    <Text style={styles.refreshBtnText}>Refresh Location</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.nextBtn, !canProceed && styles.nextDisabled]}
                    onPress={() => navigation.navigate("VerificationCamera")}
                >
                    <Text style={styles.nextBtnText}>Continue to Camera</Text>
                </TouchableOpacity>
            </View>
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
    topBarText: {
        color: "#fff",
        fontSize: 38,
        fontWeight: "700",
    },
    headerBar: {
        marginTop: 10,
        borderRadius: 16,
        marginHorizontal: 10,
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
        fontWeight: "700",
        color: "#0f2f14",
    },
    card: {
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#dbe2db",
        backgroundColor: "#fff",
        padding: 16,
    },
    statusCircle: {
        width: 108,
        height: 108,
        borderRadius: 54,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    okCircle: {
        backgroundColor: "#d9f1de",
    },
    badCircle: {
        backgroundColor: "#ffc4c4",
    },
    statusTitle: {
        marginTop: 16,
        textAlign: "center",
        fontSize: 24,
        color: "#0f2f14",
        fontWeight: "700",
    },
    statusText: {
        marginTop: 6,
        textAlign: "center",
        fontSize: 18,
    },
    okText: {
        color: "#0ea113",
    },
    badText: {
        color: "#ff4343",
    },
    infoStrip: {
        marginTop: 16,
        minHeight: 54,
        backgroundColor: "#edf2ec",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    infoLabel: {
        fontSize: 17,
        color: "#5f6971",
    },
    infoValue: {
        fontSize: 18,
        fontWeight: "700",
    },
    infoBlock: {
        marginTop: 12,
        backgroundColor: "#edf2ec",
        borderRadius: 10,
        padding: 14,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    rowLabel: {
        fontSize: 17,
        color: "#5f6971",
    },
    rowValue: {
        marginTop: 6,
        fontSize: 28,
        color: "#0f2f14",
        fontWeight: "700",
    },
    footer: {
        marginTop: "auto",
        flexDirection: "row",
        gap: 10,
        padding: 10,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#dbe2db",
    },
    refreshBtn: {
        flex: 1,
        minHeight: 50,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: "#35a853",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    refreshBtnText: {
        color: "#2e7d32",
        fontSize: 16,
        fontWeight: "700",
    },
    nextBtn: {
        flex: 1.4,
        minHeight: 50,
        borderRadius: 10,
        backgroundColor: "#38a753",
        alignItems: "center",
        justifyContent: "center",
    },
    nextDisabled: {
        opacity: 0.75,
    },
    nextBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});
