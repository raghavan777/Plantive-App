import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import API from "../../services/api";
import { sendLocalNotification } from "../../utils/notifications";

export default function StatusScreen() {
    const [status, setStatus] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    // Store previous status to detect change
    const previousStatus = useRef(null);

    useEffect(() => {
        fetchStatus();
    }, []);

    const fetchStatus = async () => {
        try {
            const res = await API.get("/farmer/status");

            const newStatus = res.data?.verificationStatus;

            // 🔔 Trigger notification if status changed
            if (
                previousStatus.current &&
                previousStatus.current !== newStatus
            ) {
                sendLocalNotification(
                    "Plantive Update 🌱",
                    `Your submission status changed to: ${newStatus}`
                );
            }

            previousStatus.current = newStatus;
            setStatus(res.data);
        } catch (err) {
            console.log("Status fetch error:", err);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchStatus();
        setRefreshing(false);
    };

    if (!status) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Loading status...</Text>
            </View>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Text style={styles.title}>Submission Status</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Crop:</Text>
                <Text>{status.crop || "N/A"}</Text>

                <Text style={styles.label}>Growth Stage:</Text>
                <Text>{status.stage || "N/A"}</Text>

                <Text style={styles.label}>Health:</Text>
                <Text>{status.health || "N/A"}</Text>

                <Text style={styles.label}>Verification Status:</Text>
                <Text style={styles.status}>{status.verificationStatus || "Pending"}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        elevation: 3,
    },
    label: {
        fontWeight: "bold",
        marginTop: 10,
    },
    status: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#2E7D32",
    },
});
