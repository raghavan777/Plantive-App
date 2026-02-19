import { StyleSheet, View } from "react-native";
import colors from "../theme/colors";

export default function AppCard({ children }) {
    return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 12,
        marginVertical: 8,
        elevation: 3,
    },
});
