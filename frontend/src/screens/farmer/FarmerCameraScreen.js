import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
    SafeAreaView,
} from "react-native";
import useRoleBackPolicy from "../../hooks/useRoleBackPolicy";
import colors from "../../theme/colors";

export default function FarmerCameraScreen({ navigation, route }) {
    useRoleBackPolicy({ navigation, homeRoute: "Home" });
    const cameraRef = useRef(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [capturing, setCapturing] = useState(false);
    const [flash, setFlash] = useState("off");
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const cropStage = route?.params?.stage || "Planting";

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const toggleFlash = () => {
        setFlash(current => (current === "off" ? "on" : "off"));
    };

    const takePicture = async () => {
        if (capturing) return;
        setCapturing(true);

        if (Platform.OS === "web") {
            setTimeout(() => {
                navigation.navigate("CapturePreview", {
                    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800",
                    stage: cropStage,
                });
                setCapturing(false);
            }, 1000);
            return;
        }

        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
                navigation.navigate("CapturePreview", {
                    image: photo.uri,
                    stage: cropStage,
                });
            } catch (e) {
                console.error(e);
            } finally {
                setCapturing(false);
            }
        }
    };

    if (!permission) return <View style={styles.center}><ActivityIndicator color={colors.primary} /></View>;
    if (!permission.granted) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Camera access is required</Text>
                <TouchableOpacity style={styles.grantBtn} onPress={requestPermission}>
                    <Text style={styles.grantBtnText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing="back" enableTorch={flash === "on"}>
                <SafeAreaView style={styles.overlay}>
                    {/* Header Controls */}
                    <View style={styles.topControls}>
                        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
                            <Ionicons name="close" size={28} color="white" />
                        </TouchableOpacity>

                        <View style={styles.stageBadge}>
                            <View style={styles.stageDot} />
                            <Text style={styles.stageText}>{cropStage} Stage</Text>
                        </View>

                        <TouchableOpacity style={styles.iconBtn} onPress={toggleFlash}>
                            <Ionicons name={flash === "on" ? "flash" : "flash-off"} size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Viewport markers */}
                    <Animated.View style={[styles.viewport, { opacity: fadeAnim }]}>
                        <View style={styles.markerContainer}>
                            <View style={[styles.corner, styles.tl]} />
                            <View style={[styles.corner, styles.tr]} />
                            <View style={[styles.corner, styles.bl]} />
                            <View style={[styles.corner, styles.br]} />

                            <View style={styles.scanLine} />
                        </View>

                        <View style={styles.guidanceBox}>
                            <MaterialCommunityIcons name="sparkles" size={16} color={colors.accent} />
                            <Text style={styles.guidanceText}>Align the crop in the markers</Text>
                        </View>
                    </Animated.View>

                    {/* Footer Controls */}
                    <View style={styles.bottomControls}>
                        <TouchableOpacity style={styles.galleryBtn}>
                            <Ionicons name="images" size={28} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.captureBtn} onPress={takePicture} disabled={capturing}>
                            <View style={styles.captureOuter}>
                                <View style={styles.captureInner}>
                                    {capturing && <ActivityIndicator color={colors.primary} />}
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.flipBtn}>
                            <Ionicons name="camera-reverse" size={28} color="white" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "black" },
    camera: { flex: 1 },
    center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background },
    errorText: { fontSize: 16, color: colors.text, marginBottom: 20 },
    grantBtn: { backgroundColor: colors.primary, padding: 15, borderRadius: 12 },
    grantBtnText: { color: "white", fontWeight: "bold" },

    overlay: { flex: 1, justifyContent: "space-between", padding: 20 },

    topControls: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center" },
    stageBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    stageDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success, marginRight: 8 },
    stageText: { color: "white", fontWeight: "bold", fontSize: 13 },

    viewport: { flex: 1, justifyContent: "center", alignItems: "center" },
    markerContainer: { width: 280, height: 380, position: "relative" },
    corner: { position: "absolute", width: 40, height: 40, borderColor: "white", borderStyle: "solid" },
    tl: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 20 },
    tr: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 20 },
    bl: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 20 },
    br: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 20 },

    scanLine: { position: "absolute", left: 10, right: 10, height: 2, backgroundColor: "rgba(255,255,255,0.3)", top: "50%" },

    guidanceBox: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(0,0,0,0.6)", padding: 12, borderRadius: 15, marginTop: 30, gap: 8 },
    guidanceText: { color: "white", fontSize: 14, fontWeight: "600" },

    bottomControls: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingBottom: 20 },
    captureBtn: { width: 80, height: 80, borderRadius: 40, backgroundColor: "rgba(255,255,255,0.3)", padding: 5, justifyContent: "center", alignItems: "center" },
    captureOuter: { width: 70, height: 70, borderRadius: 35, borderWidth: 4, borderColor: "white", padding: 3, justifyContent: "center", alignItems: "center" },
    captureInner: { width: 56, height: 56, borderRadius: 28, backgroundColor: "white", justifyContent: "center", alignItems: "center" },
    galleryBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center" },
    flipBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center" },
});
