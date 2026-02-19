import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function FarmerCameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);

    if (!permission) return <View />;
    if (!permission.granted) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>No camera permission</Text>
                <TouchableOpacity onPress={requestPermission}>
                    <Text style={{ color: "blue", marginTop: 10 }}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            alert("Photo Captured");
            console.log(photo.uri);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />
            <TouchableOpacity
                style={{
                    position: "absolute",
                    bottom: 40,
                    alignSelf: "center",
                    backgroundColor: "green",
                    padding: 20,
                    borderRadius: 50,
                }}
                onPress={takePhoto}
            >
                <Text style={{ color: "#fff" }}>Capture</Text>
            </TouchableOpacity>
        </View>
    );
}
