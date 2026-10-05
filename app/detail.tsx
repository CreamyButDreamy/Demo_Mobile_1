import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    title: string;
    category: string;
    time: string;
    price: string;
    imageUrl: string;
    ingredients?: string;
    steps?: string;
  }>();

  const ingredientsList: string[] = params.ingredients
    ? JSON.parse(params.ingredients)
    : [];
  const stepsList: string[] = params.steps ? JSON.parse(params.steps) : [];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Kembali</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        {params.imageUrl ? (
          <Image source={{ uri: params.imageUrl }} style={styles.image} />
        ) : null}

        <Text style={styles.category}>{params.category || "Resep Kos"}</Text>
        <Text style={styles.title}>{params.title || "Detail Resep"}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoBadge}>⏱️ {params.time || "-"}</Text>
          <Text style={styles.infoBadge}>💰 {params.price || "-"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bahan-bahan:</Text>
          {ingredientsList.map((item, index) => (
            <Text key={index} style={styles.text}>
              • {item}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Langkah Memasak:</Text>
          {stepsList.map((step, index) => (
            <Text key={index} style={styles.text}>
              {index + 1}. {step}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  backButton: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 5 },
  backText: { fontSize: 16, color: "#007AFF", fontWeight: "bold" },
  content: { padding: 20 },
  image: { width: "100%", height: 200, borderRadius: 12, marginBottom: 15 },
  category: {
    fontSize: 14,
    color: "#E67E22",
    fontWeight: "600",
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  infoRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  infoBadge: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 13,
  },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  text: { fontSize: 14, color: "#555", lineHeight: 22, marginBottom: 4 },
});
