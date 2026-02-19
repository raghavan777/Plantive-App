import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const historyData = [
    {
        id: "SUB24001",
        crop: "Paddy (Rice)",
        stage: "Flowering Stage",
        date: "Today, 10:30 AM",
        status: "Approved",
        statusColor: "#2fa64f",
        image: "https://images.unsplash.com/photo-1536633343358-006277979607?w=400"
    },
    {
        id: "SUB24002",
        crop: "Wheat",
        stage: "Vegetative Stage",
        date: "Yesterday, 3:15 PM",
        status: "Processing",
        statusColor: "#f39b08",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400"
    },
    {
        id: "SUB24003",
        crop: "Maize",
        stage: "Maturity Stage",
        date: "Dec 20, 2023",
        status: "Rejected",
        statusColor: "#d32f2f",
        image: "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=400"
    }
];

export default function FarmerHistoryScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>Submission History</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.headBlock}>
                    <Text style={styles.pageTitle}>History</Text>
                    <Text style={styles.pageSub}>View all your past crop submissions</Text>
                </View>

                {historyData.map((item) => (
                    <View key={item.id} style={styles.historyCard}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.cardContent}>
                            <View style={styles.rowBetween}>
                                <Text style={styles.cropTitle}>{item.crop}</Text>
                                <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
                            </View>
                            <Text style={styles.stageText}>{item.stage}</Text>
                            <View style={styles.metaRow}>
                                <Ionicons name="calendar-outline" size={14} color="#66707a" />
                                <Text style={styles.metaText}>{item.date}</Text>
                                <Text style={[styles.metaText, { marginLeft: 10 }]}>• # {item.id}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7faf7",
    },
    topBar: {
        backgroundColor: "#319a4e",
        height: 64,
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    topBarText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
    content: {
        paddingBottom: 24,
    },
    headBlock: {
        paddingHorizontal: 18,
        paddingTop: 20,
        paddingBottom: 16,
    },
    pageTitle: {
        fontSize: 28,
        color: "#0f2f14",
        fontWeight: "800",
    },
    pageSub: {
        marginTop: 4,
        fontSize: 15,
        color: "#677581",
    },
    historyCard: {
        marginHorizontal: 16,
        marginTop: 16,
        backgroundColor: "#fff",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#e1e7e1",
        overflow: "hidden",
        elevation: 2,
    },
    image: {
        width: "100%",
        height: 180,
        backgroundColor: "#eee",
    },
    cardContent: {
        padding: 16,
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cropTitle: {
        fontSize: 20,
        color: "#12331a",
        fontWeight: "800",
    },
    statusText: {
        fontSize: 14,
        fontWeight: "700",
    },
    stageText: {
        marginTop: 2,
        fontSize: 15,
        color: "#5d6a74",
    },
    metaRow: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    metaText: {
        color: "#6c7781",
        fontSize: 13,
        marginLeft: 4,
    },
});
