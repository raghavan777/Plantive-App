import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const defaultTask = {
    farmId: "A123",
    farmer: "Ramesh Patel",
    crop: "Rice",
    location: "Ramgarh Village",
    deadline: "Today, 4 PM",
};

const steps = [
    {
        id: 1,
        title: "GPS Location Check",
        subtitle: "Verify you are within 50-100 meters of the farm",
    },
    {
        id: 2,
        title: "Capture Field Photos",
        subtitle: "Take wide field, close crop, and damage specific photos",
    },
    {
        id: 3,
        title: "Damage Assessment",
        subtitle: "Fill damage assessment form with crop details",
    },
    {
        id: 4,
        title: "Review & Submit",
        subtitle: "Review all data and submit verification report",
    },
];

const requirements = [
    "Must be at farm location",
    "Good lighting conditions",
    "Stable internet connection (or offline mode)",
    "GPS enabled on device",
    "Camera permission granted",
];

export default function VerificationScreen({ navigation, route }) {
    const passedTask = route?.params?.task;
    const task = {
        farmId: passedTask?.title?.match(/#([A-Za-z0-9]+)/)?.[1] ?? defaultTask.farmId,
        farmer: passedTask?.farmer ?? defaultTask.farmer,
        crop: passedTask?.crop ?? defaultTask.crop,
        location: passedTask?.village ? `${passedTask.village} Village` : defaultTask.location,
        deadline: passedTask?.deadline ?? defaultTask.deadline,
    };

    const startVerification = () => {
        Alert.alert("Verification Started", "Proceeding with the field verification flow.");
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>verification/index</Text>
            </View>

            <View style={styles.hero}>
                <Text style={styles.title}>Field Verification</Text>
                <Text style={styles.subtitle}>Complete farm inspection process</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Current Assignment</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Farm ID:</Text>
                    <Text style={styles.value}>#{task.farmId}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Farmer:</Text>
                    <Text style={styles.value}>{task.farmer}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Crop:</Text>
                    <Text style={styles.value}>{task.crop}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Location:</Text>
                    <Text style={styles.value}>{task.location}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Deadline:</Text>
                    <Text style={styles.deadline}>{task.deadline}</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Verification Steps</Text>
            <View style={styles.card}>
                {steps.map((step, index) => (
                    <View key={step.id} style={styles.stepRow}>
                        <View style={styles.stepLeft}>
                            <View style={styles.stepCircle}>
                                <Text style={styles.stepNumber}>{step.id}</Text>
                            </View>
                            {index !== steps.length - 1 ? <View style={styles.stepLine} /> : null}
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>{step.title}</Text>
                            <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.requirementsCard}>
                <Text style={styles.requirementsTitle}>Requirements:</Text>
                {requirements.map((item) => (
                    <Text key={item} style={styles.requirementItem}>
                        {"\u2022"} {item}
                    </Text>
                ))}
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={startVerification}>
                <Text style={styles.primaryBtnText}>Start Verification Process</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => navigation.navigate("Assignments")}
            >
                <Text style={styles.secondaryBtnText}>Back to Assignments</Text>
            </TouchableOpacity>

            <View style={styles.offlineCard}>
                <Text style={styles.offlineTitle}>Offline Mode Available</Text>
                <Text style={styles.offlineText}>
                    If you lose internet connection, you can still complete verification. Data will
                    auto-sync when connection is restored.
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#edf2ec",
    },
    content: {
        paddingBottom: 24,
    },
    topBar: {
        backgroundColor: "#35a853",
        height: 54,
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    topBarText: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "700",
    },
    hero: {
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 14,
    },
    title: {
        fontSize: 24,
        color: "#0f3d16",
        fontWeight: "800",
    },
    subtitle: {
        marginTop: 6,
        fontSize: 16,
        color: "#56666f",
    },
    card: {
        marginHorizontal: 16,
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginTop: 12,
        borderWidth: 1,
        borderColor: "#e7ece7",
    },
    cardTitle: {
        fontSize: 30,
        fontWeight: "700",
        color: "#0f3d16",
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 4,
    },
    label: {
        fontSize: 17,
        color: "#596874",
    },
    value: {
        fontSize: 18,
        color: "#0f1d21",
        fontWeight: "600",
    },
    deadline: {
        fontSize: 18,
        color: "#f24848",
        fontWeight: "700",
    },
    sectionTitle: {
        marginTop: 18,
        marginHorizontal: 16,
        fontSize: 32,
        color: "#0f3d16",
        fontWeight: "800",
    },
    stepRow: {
        flexDirection: "row",
    },
    stepLeft: {
        width: 32,
        alignItems: "center",
    },
    stepCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: "#35a853",
        alignItems: "center",
        justifyContent: "center",
    },
    stepNumber: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 12,
    },
    stepLine: {
        width: 2,
        flex: 1,
        minHeight: 18,
        backgroundColor: "#d0d7d0",
        marginTop: 4,
        marginBottom: 4,
    },
    stepContent: {
        flex: 1,
        paddingLeft: 12,
        paddingBottom: 14,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0f1d21",
    },
    stepSubtitle: {
        fontSize: 16,
        color: "#596874",
        marginTop: 2,
    },
    requirementsCard: {
        marginHorizontal: 16,
        marginTop: 14,
        backgroundColor: "#dde7db",
        borderLeftWidth: 4,
        borderLeftColor: "#35a853",
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 12,
    },
    requirementsTitle: {
        fontSize: 18,
        color: "#0f1d21",
        fontWeight: "700",
        marginBottom: 4,
    },
    requirementItem: {
        fontSize: 16,
        color: "#5f6e78",
        lineHeight: 24,
    },
    primaryBtn: {
        marginHorizontal: 16,
        marginTop: 14,
        backgroundColor: "#35a853",
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
    },
    primaryBtnText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "700",
    },
    secondaryBtn: {
        marginHorizontal: 16,
        marginTop: 10,
        borderWidth: 1.5,
        borderColor: "#35a853",
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
        backgroundColor: "#fff",
    },
    secondaryBtnText: {
        fontSize: 18,
        color: "#2e7d32",
        fontWeight: "600",
    },
    offlineCard: {
        marginHorizontal: 16,
        marginTop: 14,
        backgroundColor: "#dde7db",
        borderRadius: 10,
        padding: 12,
    },
    offlineTitle: {
        fontSize: 16,
        color: "#0f1d21",
        fontWeight: "700",
        marginBottom: 2,
    },
    offlineText: {
        fontSize: 14,
        color: "#5f6e78",
        lineHeight: 20,
    },
});
