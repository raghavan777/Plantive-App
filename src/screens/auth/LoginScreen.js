import { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";

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
      >
        {/* Icon Circle */}
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>{icon}</Text>
        </View>

        {/* Text */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sub}>{subtitle}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Select Your Role</Text>
      </View>

      {/* Title */}
      <View style={styles.center}>
        <Text style={styles.mainTitle}>Select Your Role</Text>
        <Text style={styles.subTitle}>अपनी भूमिका चुनें</Text>
      </View>

      {/* Cards */}
      <View style={styles.cards}>
        <RoleCard
          role="farmer"
          icon="👨‍🌾"
          title="Farmer"
          subtitle="किसान"
          desc="Upload crop images, track claims, get AI analysis"
        />

        <RoleCard
          role="official"
          icon="👨‍💼"
          title="Field Official"
          subtitle="क्षेत्र अधिकारी"
          desc="Verify crops, submit reports, manage assigned farms"
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue →</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const GREEN = "#2E7D32";
const LIGHT_GREEN = "#E8F5E9";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f6f4",
  },

  header: {
    backgroundColor: GREEN,
    padding: 16,
  },

  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  center: {
    alignItems: "center",
    marginVertical: 20,
  },

  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1b3a1b",
  },

  subTitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },

  cards: {
    paddingHorizontal: 16,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 24,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },

  cardActive: {
    borderColor: GREEN,
    backgroundColor: LIGHT_GREEN,
  },

  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: GREEN,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  icon: {
    fontSize: 30,
    color: "white",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },

  sub: {
    fontSize: 16,
    color: "#666",
    marginTop: 2,
  },

  desc: {
    textAlign: "center",
    marginTop: 6,
    color: "#555",
  },

  button: {
    marginTop: "auto",
    backgroundColor: GREEN,
    margin: 20,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
