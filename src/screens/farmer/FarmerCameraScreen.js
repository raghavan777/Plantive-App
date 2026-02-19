import { Camera } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function FarmerCameraScreen() {
    const [permission, setPermission] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setPermission(status === "granted");
        })();
    }, []);

    if (permission === null) return <Text>Requesting camera...</Text>;
    if (permission === false) return <Text>No camera permission</Text>;

    const takePhoto = async () => {
        const photo = await cameraRef.current.takePictureAsync();
        alert("Photo Captured");
        console.log(photo.uri);
    };

    return (
        <View style={{ flex: 1 }}>
            <Camera ref={cameraRef} style={{ flex: 1 }} />
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
