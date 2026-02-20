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
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    text: {
        color: colors.surface,
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
});

