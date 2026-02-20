import { StyleSheet, View } from "react-native";
import colors from "../theme/colors";

export default function AppCard({ children }) {
    return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        padding: 20,
        borderRadius: 16,
        marginVertical: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
    },
});

