import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchRecipeById } from "../services/recipeService";
import ErrorMessage from "../src/components/ErrorMessage";
import Loading from "../src/components/Loading";
import { Recipe } from "../types/recipe";

export default function DetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadDetail = () => {
    if (!params.id) {
      setError("ID resep tidak ditemukan.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetchRecipeById(params.id)
      .then((data) => {
        setRecipe(data);
      })
      .catch((err) => {
        setError(err.message || "Gagal memuat detail resep.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadDetail();
  }, [params.id]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/");
          }
        }}
      >
        <Text style={styles.backText}>← Kembali</Text>
      </TouchableOpacity>

      {loading ? (
        <Loading message="Mengambil detail resep..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={loadDetail} />
      ) : recipe ? (
        <ScrollView contentContainerStyle={styles.content}>
          <Image source={{ uri: recipe.image }} style={styles.image} />

          <Text style={styles.category}>{recipe.cuisine.toUpperCase()}</Text>
          <Text style={styles.title}>{recipe.name}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoBadge}>
              ⏱️ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} Menit
            </Text>
            {recipe.price ? (
              <Text style={styles.infoBadge}>💰 {recipe.price}</Text>
            ) : null}
            <Text style={styles.infoBadge}>🔥 {recipe.difficulty}</Text>
            <Text style={styles.infoBadge}>⭐ {recipe.rating.toFixed(1)}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bahan-bahan:</Text>
            {recipe.ingredients.map((item, index) => (
              <Text key={index} style={styles.text}>
                • {item}
              </Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Langkah Memasak:</Text>
            {recipe.instructions.map((step, index) => (
              <Text key={index} style={styles.text}>
                {index + 1}. {step}
              </Text>
            ))}
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  backButton: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 5 },
  backText: { fontSize: 16, color: "#007AFF", fontWeight: "bold" },
  content: { padding: 20 },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: "#F2F2F2",
  },
  category: {
    fontSize: 13,
    color: "#FF6B6B",
    fontWeight: "bold",
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  infoBadge: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 13,
    color: "#333333",
  },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  text: { fontSize: 14, color: "#555555", lineHeight: 22, marginBottom: 4 },
});
