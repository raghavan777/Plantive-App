import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Animated,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function FarmerCameraScreen({ navigation, route }) {
    const cameraRef = useRef(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [capturing, setCapturing] = useState(false);
    const [guidanceIndex, setGuidanceIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const cropStage = route?.params?.stage || "Not Selected";

    const guidanceMessages = [
        { text: "Position crop within frame", icon: "scan-outline", color: "#4ade80" },
        { text: "Perfect Distance", icon: "checkmark-circle", color: "#22c55e" },
        { text: "Hold Steady...", icon: "hand-right-outline", color: "#f59e0b" },
        { text: "Lighting Optimized", icon: "sunny-outline", color: "#10b981" }
    ];

    useEffect(() => {
        // Simple entry animation
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();

        const interval = setInterval(() => {
            setGuidanceIndex((prev) => (prev + 1) % guidanceMessages.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    const captureAnyway = async () => {
        if (capturing) return;

        if (Platform.OS === "web") {
            navigation.navigate("CapturePreview", {
                image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200",
                stage: cropStage,
            });
            return;
        }

        if (!cameraRef.current) return;

        try {
            setCapturing(true);
            const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
            navigation.navigate("CapturePreview", {
                image: photo.uri,
                stage: cropStage,
            });
        } catch (error) {
            console.log("Capture error:", error);
        } finally {
            setCapturing(false);
        }
    };

    if (!permission) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#4ade80" />
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.center}>
                <Text style={styles.centerText}>Camera access required</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.permissionBtn}>
                    <Text style={styles.permissionBtnText}>Enable Camera</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const currentGuidance = guidanceMessages[guidanceIndex];

    return (
        <View style={styles.container}>
            {/* Minimalist Glassy Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerTitleGroup}>
                    <Text style={styles.headerTitle}>Intelligent Capture</Text>
                    <View style={styles.stageTag}>
                        <View style={styles.stageDot} />
                        <Text style={styles.stageText}>{cropStage}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.headerIconBtn}>
                    <Ionicons name="flash-outline" size={22} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.cameraArea}>
                <CameraView ref={cameraRef} style={styles.cameraView} facing="back" />

                {/* Viewport Overlays */}
                <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>

                    {/* Floating Guidance Bubble */}
                    <View style={styles.guidanceBubble}>
                        <View style={[styles.guidanceIndicator, { backgroundColor: currentGuidance.color }]} />
                        <Ionicons name={currentGuidance.icon} size={18} color="#fff" style={styles.guidanceIcon} />
                        <Text style={styles.guidanceMsg}>{currentGuidance.text}</Text>
                    </View>

                    {/* Minimalist Animated Corners */}
                    <View style={styles.viewportFrame}>
                        <View style={styles.frameCorners}>
                            <View style={[styles.corner, styles.tl]} />
                            <View style={[styles.corner, styles.tr]} />
                            <View style={[styles.corner, styles.bl]} />
                            <View style={[styles.corner, styles.br]} />
                        </View>

                        {/* Live Stat Chips */}
                        <View style={styles.statsRow}>
                            <View style={styles.statChip}>
                                <Text style={styles.statLabel}>CLARITY</Text>
                                <Text style={styles.statValue}>98%</Text>
                            </View>
                            <View style={styles.statChip}>
                                <Text style={styles.statLabel}>EXPOSURE</Text>
                                <Text style={styles.statValue}>Optimal</Text>
                            </View>
                        </View>
                    </View>

                    {/* Contextual Action Button */}
                    <View style={styles.contextualSlot}>
                        <View style={styles.detectionAlert}>
                            <Ionicons name="sparkles" size={14} color="#4ade80" />
                            <Text style={styles.detectionText}>Crop Focus Locked</Text>
                        </View>
                    </View>

                </Animated.View>
            </View>

            {/* Premium Control Panel */}
            <View style={styles.controlPanel}>
                <View style={styles.controlTopRow}>
                    <TouchableOpacity style={styles.sideControl}>
                        <Ionicons name="images-outline" size={24} color="#94a3b8" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.mainCaptureBtn, capturing && styles.btnDisabled]}
                        onPress={captureAnyway}
                        activeOpacity={0.9}
                    >
                        <View style={styles.captureRing}>
                            <View style={styles.captureCore}>
                                {capturing ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <View style={styles.captureDot} />
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.sideControl}>
                        <Ionicons name="sync-outline" size={24} color="#94a3b8" />
                    </TouchableOpacity>
                </View>

                <View style={styles.instructionShelf}>
                    <Text style={styles.shelfText}>Align center of the crop within the markers for best AI analysis</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#020617",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: Platform.OS === "ios" ? 60 : 30,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: "rgba(2, 6, 23, 0.85)",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.05)",
    },
    headerIconBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "rgba(255,255,255,0.05)",
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitleGroup: {
        alignItems: "center",
    },
    headerTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    stageTag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.05)",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 12,
        marginTop: 4,
    },
    stageDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#4ade80",
        marginRight: 6,
    },
    stageText: {
        color: "#94a3b8",
        fontSize: 11,
        fontWeight: "600",
    },
    cameraArea: {
        flex: 1,
        backgroundColor: "#000",
        overflow: "hidden",
    },
    cameraView: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        padding: 24,
        justifyContent: "space-between",
    },
    guidanceBubble: {
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
        marginTop: 10,
    },
    guidanceIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 10,
    },
    guidanceIcon: {
        marginRight: 8,
    },
    guidanceMsg: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
    viewportFrame: {
        flex: 1,
        marginVertical: 40,
        justifyContent: "space-between",
    },
    frameCorners: {
        flex: 1,
        position: "relative",
    },
    corner: {
        position: "absolute",
        width: 24,
        height: 24,
        borderColor: "rgba(74, 222, 128, 0.6)",
    },
    tl: { top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2, borderTopLeftRadius: 8 },
    tr: { top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2, borderTopRightRadius: 8 },
    bl: { bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2, borderBottomLeftRadius: 8 },
    br: { bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2, borderBottomRightRadius: 8 },
    statsRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 12,
        marginBottom: 20,
    },
    statChip: {
        backgroundColor: "rgba(2, 6, 23, 0.6)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
        alignItems: "center",
    },
    statLabel: {
        color: "rgba(255,255,255,0.4)",
        fontSize: 8,
        fontWeight: "800",
        letterSpacing: 1,
    },
    statValue: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
        marginTop: 1,
    },
    contextualSlot: {
        alignItems: "center",
        marginBottom: 10,
    },
    detectionAlert: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(46, 125, 50, 0.3)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
        borderWidth: 1,
        borderColor: "rgba(74, 222, 128, 0.2)",
    },
    detectionText: {
        color: "#4ade80",
        fontSize: 12,
        fontWeight: "700",
    },
    controlPanel: {
        backgroundColor: "#020617",
        paddingTop: 30,
        paddingBottom: Platform.OS === "ios" ? 50 : 35,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    controlTopRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        paddingHorizontal: 40,
    },
    sideControl: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "rgba(255,255,255,0.03)",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
    },
    mainCaptureBtn: {
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: "rgba(255,255,255,0.05)",
        padding: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    captureRing: {
        flex: 1,
        width: "100%",
        borderRadius: 40,
        borderWidth: 2,
        borderColor: "rgba(74, 222, 128, 0.3)",
        padding: 4,
    },
    captureCore: {
        flex: 1,
        borderRadius: 36,
        backgroundColor: "#2e7d32",
        alignItems: "center",
        justifyContent: "center",
    },
    captureDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(255,255,255,0.4)",
    },
    btnDisabled: {
        opacity: 0.6,
    },
    instructionShelf: {
        marginTop: 24,
        paddingHorizontal: 40,
    },
    shelfText: {
        color: "#64748b",
        fontSize: 12,
        textAlign: "center",
        lineHeight: 18,
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#020617",
    },
    centerText: {
        color: "#fff",
        fontSize: 16,
        marginBottom: 20,
    },
    permissionBtn: {
        backgroundColor: "#2e7d32",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 16,
    },
    permissionBtnText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
    },
});
