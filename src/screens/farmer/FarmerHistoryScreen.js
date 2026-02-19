import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import API from "../../services/api";

export default function HistoryScreen() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await API.get("/farmer/history");
            setHistory(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 18 }}>Submission History</Text>

            <FlatList
                data={history}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}>
                        <Image source={{ uri: item.image }} style={{ height: 150 }} />

                        <Text>Crop: {item.crop}</Text>
                        <Text>Stage: {item.stage}</Text>
                        <Text>Status: {item.status}</Text>
                    </View>
                )}
            />
        </View>
    );
}
