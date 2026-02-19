import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function CameraScreen({ navigation, route }) {
    const cameraRef = useRef(null);

    const [hasPermission, setHasPermission] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [loading, setLoading] = useState(false);

    // Get camera permission
    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            const mediaStatus = await MediaLibrary.requestPermissionsAsync();

            setHasPermission(
                cameraStatus.status === "granted" &&
                mediaStatus.status === "granted"
            );
        })();
    }, []);

    // Take photo
    const takePicture = async () => {
        if (!cameraRef.current) return;

        try {
            setLoading(true);

            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.7,
                base64: false,
            });

            setCapturedPhoto(photo.uri);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // Save & go preview
    const confirmPhoto = async () => {
        await MediaLibrary.saveToLibraryAsync(capturedPhoto);

        navigation.navigate("Preview", {
            image: capturedPhoto,
            stage: route.params?.stage || "Unknown",
        });
    };

    if (hasPermission === null)
        return <ActivityIndicator style={{ flex: 1 }} size="large" />;

    if (hasPermission === false)
        return (
            <View style={styles.center}>
                <Text>No Camera Permission</Text>
            </View>
        );

    // Preview Mode
    if (capturedPhoto) {
        return (
            <View style={{ flex: 1 }}>
                <Image source={{ uri: capturedPhoto }} style={{ flex: 1 }} />

                <View style={styles.previewControls}>
                    <TouchableOpacity
                        style={styles.retakeBtn}
                        onPress={() => setCapturedPhoto(null)}
                    >
                        <Text style={{ color: "#fff" }}>Retake</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.useBtn} onPress={confirmPhoto}>
                        <Text style={{ color: "#fff" }}>Use Photo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // Camera Mode
    return (
        <View style={{ flex: 1 }}>
            <Camera ref={cameraRef} style={{ flex: 1 }} />

            <View style={styles.controls}>
                <TouchableOpacity
                    style={styles.captureBtn}
                    onPress={takePicture}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Ionicons name="camera" size={28} color="#fff" />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    controls: {
        position: "absolute",
        bottom: 30,
        width: "100%",
        alignItems: "center",
    },

    captureBtn: {
        backgroundColor: "#3aa655",
        width: 70,
        height: 70,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
    },

    previewControls: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },

    retakeBtn: {
        backgroundColor: "#999",
        padding: 12,
        borderRadius: 8,
    },

    useBtn: {
        backgroundColor: "#3aa655",
        padding: 12,
        borderRadius: 8,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});