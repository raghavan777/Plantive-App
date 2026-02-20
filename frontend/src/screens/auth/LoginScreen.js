import { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import colors from "../../theme/colors";
import { FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (!selected) return;

    if (selected === "farmer") {
      navigation.navigate("FarmerLogin");
    } else {
      navigation.navigate("OfficialLogin");
    }
  };

  const RoleCard = ({ role, icon, title, subtitle, desc }) => {
    const active = selected === role;

    return (
      <TouchableOpacity
        style={[styles.card, active && styles.cardActive]}
        onPress={() => setSelected(role)}
        activeOpacity={0.9}
      >
        <View style={[styles.iconCircle, active && styles.iconCircleActive]}>
          <FontAwesome5 name={icon} size={32} color={active ? "white" : colors.primary} />
        </View>

        <View style={styles.cardTextContent}>
          <Text style={[styles.title, active && styles.textActive]}>{title}</Text>
          <Text style={[styles.sub, active && styles.textActive]}>{subtitle}</Text>
          <Text style={[styles.desc, active && styles.textActive]}>{desc}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="leaf" size={24} color="white" />
        <Text style={styles.headerText}>Plantive</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Select Your Role</Text>
          <Text style={styles.subTitle}>अपनी भूमिका चुनें</Text>
        </View>

        <View style={styles.cardsContainer}>
          <RoleCard
            role="farmer"
            icon="tractor"
            title="Farmer"
            subtitle="किसान"
            desc="Upload crop images, track claims, get AI analysis"
          />

          <RoleCard
            role="official"
            icon="user-tie"
            title="Field Official"
            subtitle="क्षेत्र अधिकारी"
            desc="Verify crops, submit reports, manage assigned farms"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, !selected && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!selected}
        >
          <Text style={styles.buttonText}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    backgroundColor: colors.primary,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },

  headerText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  content: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },

  titleContainer: {
    alignItems: "center",
    marginVertical: 10,
  },

  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
  },

  subTitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginTop: 4,
  },

  cardsContainer: {
    marginVertical: 20,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  cardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "10", // Very light primary
    elevation: 8,
  },

  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },

  iconCircleActive: {
    backgroundColor: colors.primary,
  },

  cardTextContent: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },

  sub: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 2,
  },

  desc: {
    marginTop: 6,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },

  textActive: {
    color: colors.primary,
  },

  button: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    elevation: 5,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  buttonDisabled: {
    backgroundColor: colors.textSecondary + "40",
    elevation: 0,
    shadowOpacity: 0,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

