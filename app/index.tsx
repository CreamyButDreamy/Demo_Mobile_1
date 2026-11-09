import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchRecipes, searchRecipesFromApi } from "../services/recipeService";
import ErrorMessage from "../src/components/ErrorMessage";
import Loading from "../src/components/Loading";
import RecipeCard from "../src/components/RecipeCard";
import SearchBar from "../src/components/SearchBar";
import { Recipe } from "../types/recipe";

export default function Page() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRecipes();
      setRecipes(data);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat memuat resep");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      loadRecipes();
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      searchRecipesFromApi(searchQuery)
        .then((results) => {
          setRecipes(results);
          setError(null);
        })
        .catch((err) => {
          setError(err.message || "Gagal mencari resep");
        })
        .finally(() => {
          setLoading(false);
        });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🍳 Resep Masakan Anak Kos</Text>
        <Text style={styles.headerSubtitle}>
          Menu hemat, praktis & serba cepat (Live API)
        </Text>
      </View>

      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <Loading message="Mengambil daftar resep dari server..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={loadRecipes} />
        ) : recipes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tidak ada resep yang cocok.</Text>
          </View>
        ) : (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.name}
              category={recipe.cuisine}
              time={`${recipe.prepTimeMinutes + recipe.cookTimeMinutes} Menit`}
              price={recipe.price}
              difficulty={recipe.difficulty}
              rating={recipe.rating}
              imageUrl={recipe.image}
              onPress={() =>
                router.push({
                  pathname: "/detail",
                  params: { id: recipe.id.toString() },
                })
              }
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#777777",
    marginTop: 2,
  },
  listContainer: {
    padding: 20,
  },
  emptyContainer: {
    paddingVertical: 50,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#888888",
  },
});
