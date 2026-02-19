import { Text, View } from "react-native";

export default function ReportsScreen() {
    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18 }}>Farm Reports</Text>

            {/* API → Farm data, crop stage, ML result */}
            <Text>Crop: Rice</Text>
            <Text>Growth Stage: Flowering</Text>
            <Text>Health: Good</Text>
        </View>
    );
}
