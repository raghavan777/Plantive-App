import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../theme/colors";

export default function AppButton({ title, onPress }) {
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: colors.primary,
        padding: 12,
        borderRadius: 8,
        marginVertical: 6,
    },
    text: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
});
