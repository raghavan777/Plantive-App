import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const thumbs = new Array(20).fill(
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=240"
);

export default function VerificationCameraScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>verification/camera</Text>
            </View>

            <View style={styles.headerBar}>
                <TouchableOpacity
                    style={styles.iconBtn}
                    onPress={() => navigation.navigate("VerificationGPS")}
                >
                    <Ionicons name="arrow-back" size={24} color="#0f3216" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Capture Photos</Text>
                <TouchableOpacity style={styles.iconBtn}>
                    <Ionicons name="information-circle" size={24} color="#1d74d6" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Verification Photos (26/2)</Text>

                    <View style={[styles.photoTypeRow, styles.photoTypeDone]}>
                        <View style={styles.typeLeft}>
                            <View style={styles.typeIconWrap}>
                                <Ionicons name="scan-circle" size={22} color="#b9c7b8" />
                            </View>
                            <View>
                                <Text style={styles.typeTitle}>Wide Field Photo</Text>
                                <Text style={styles.typeSub}>Capture entire field from a distance</Text>
                            </View>
                        </View>
                        <View style={styles.doneBadge}>
                            <Ionicons name="checkmark" size={16} color="#fff" />
                        </View>
                    </View>

                    <View style={styles.captureStrip}>
                        <Text style={styles.captureStripTitle}>Captured Photos</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.thumbRow}>
                                {thumbs.map((uri, index) => (
                                    <View key={`${uri}-${index}`} style={styles.thumbWrap}>
                                        <Image source={{ uri }} style={styles.thumb} />
                                        <View style={styles.thumbDone}>
                                            <Ionicons name="checkmark" size={10} color="#fff" />
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                    <View style={styles.photoTypeRow}>
                        <View style={styles.typeLeft}>
                            <View style={styles.typeIconWrap}>
                                <Ionicons name="scan-circle" size={22} color="#b9c7b8" />
                            </View>
                            <View>
                                <Text style={styles.typeTitle}>Close Crop Photo</Text>
                                <Text style={styles.typeSub}>Capture crop condition and leaf details</Text>
                            </View>
                        </View>
                        <View style={styles.counterBadge}>
                            <Text style={styles.counterText}>0</Text>
                        </View>
                    </View>

                    <View style={styles.photoTypeRow}>
                        <View style={styles.typeLeft}>
                            <View style={styles.typeIconWrap}>
                                <Ionicons name="warning" size={18} color="#6f7a83" />
                            </View>
                            <View>
                                <Text style={styles.typeTitle}>Damage Specific Photo (Optional)</Text>
                                <Text style={styles.typeSub}>Close-up of affected areas</Text>
                            </View>
                        </View>
                        <View style={styles.counterBadge}>
                            <Text style={styles.counterText}>3</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.bottomPanel}>
                <View style={styles.scanIndicator}>
                    <Text style={styles.scanIndicatorText}>◌ Wide Field Photo</Text>
                </View>
                <Text style={styles.panelTitle}>Capture entire field from a distance</Text>
                <Text style={styles.panelSub}>Camera will auto-capture when conditions are optimal</Text>

                <View style={styles.panelActions}>
                    <TouchableOpacity style={styles.manualBtn}>
                        <Ionicons name="aperture" size={24} color="#e6f3e7" />
                        <Text style={styles.manualBtnText}>Capture Manually</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.nextBtn}
                        onPress={() => navigation.navigate("VerificationAssessment")}
                    >
                        <Text style={styles.nextBtnText}>Next: Assessment</Text>
                        <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
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
    scroll: {
        flex: 1,
    },
    content: {
        paddingBottom: 190,
    },
    card: {
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#dbe2db",
        backgroundColor: "#fff",
        padding: 14,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0f2f14",
        marginBottom: 10,
    },
    photoTypeRow: {
        minHeight: 64,
        borderWidth: 1,
        borderColor: "#d5ddd5",
        borderRadius: 12,
        backgroundColor: "#edf2ec",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        marginBottom: 10,
    },
    photoTypeDone: {
        borderColor: "#38a753",
        backgroundColor: "#dff0df",
    },
    typeLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    typeIconWrap: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#d5e1d4",
    },
    typeTitle: {
        fontSize: 16,
        color: "#0f2f14",
        fontWeight: "700",
    },
    typeSub: {
        marginTop: 2,
        fontSize: 14,
        color: "#5f6971",
    },
    doneBadge: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#0cab12",
        alignItems: "center",
        justifyContent: "center",
    },
    counterBadge: {
        minWidth: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#c6cccc",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 8,
    },
    counterText: {
        color: "#fff",
        fontWeight: "700",
    },
    captureStrip: {
        marginBottom: 8,
        borderRadius: 10,
        backgroundColor: "#353535",
        paddingVertical: 8,
    },
    captureStripTitle: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 18,
        paddingHorizontal: 10,
        marginBottom: 8,
    },
    thumbRow: {
        flexDirection: "row",
        paddingHorizontal: 10,
        gap: 8,
    },
    thumbWrap: {
        position: "relative",
    },
    thumb: {
        width: 64,
        height: 44,
        borderRadius: 8,
    },
    thumbDone: {
        position: "absolute",
        top: -5,
        right: -5,
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#38a753",
    },
    bottomPanel: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#131517",
        borderTopWidth: 1,
        borderTopColor: "#30363d",
        paddingTop: 8,
        paddingBottom: 12,
        paddingHorizontal: 10,
    },
    scanIndicator: {
        alignSelf: "center",
        backgroundColor: "#1e4f2c",
        borderRadius: 18,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: "#2ea854",
    },
    scanIndicatorText: {
        color: "#82c992",
        fontWeight: "700",
    },
    panelTitle: {
        marginTop: 8,
        color: "#fff",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "700",
    },
    panelSub: {
        marginTop: 3,
        color: "#d2d7db",
        textAlign: "center",
        fontSize: 16,
    },
    panelActions: {
        marginTop: 10,
        flexDirection: "row",
        gap: 8,
    },
    manualBtn: {
        flex: 1,
        minHeight: 52,
        borderRadius: 10,
        backgroundColor: "#9fc49a",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },
    manualBtnText: {
        color: "#f1f7f2",
        fontSize: 16,
        fontWeight: "700",
    },
    nextBtn: {
        flex: 1,
        minHeight: 52,
        borderRadius: 10,
        backgroundColor: "#42ac56",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
    },
    nextBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});
