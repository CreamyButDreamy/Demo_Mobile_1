import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RecipeCard from "../src/components/RecipeCard";
import SearchBar from "../src/components/SearchBar";

const DUMMY_RECIPES = [
  {
    id: "1",
    title: "Nasi Goreng Tang tanggal Tua",
    category: "Serba Telur",
    time: "10 Menit",
    price: "~Rp 7.000",
    imageUrl:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=500",
    ingredients: [
      "1 piring nasi dingin",
      "1 butir telur",
      "2 siung bawang putih",
      "Kecap manis & garam secukupnya",
    ],
    steps: [
      "Cincang bawang putih lalu tumis hingga harum.",
      "Masukkan telur, orak-arik hingga matang.",
      "Masukkan nasi, tambahkan kecap dan garam.",
      "Aduk rata hingga matang dan sajikan.",
    ],
  },
  {
    id: "2",
    title: "Omelet Mie Instant Spesial Kos",
    category: "Olahan Mie",
    time: "15 Menit",
    price: "~Rp 6.000",
    imageUrl:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=500",
    ingredients: [
      "1 bungkus mie instan",
      "2 butir telur",
      "1 batang daun bawang",
    ],
    steps: [
      "Rebus mie setengah matang, tiriskan.",
      "Kocok telur bersama bumbu mie dan daun bawang.",
      "Campurkan mie ke dalam kocokan telur.",
      "Goreng dengan api kecil sampai matang kecokelatan.",
    ],
  },
  {
    id: "3",
    title: "Tumis Tahu Tempe Kecap",
    category: "Hemat & Sehat",
    time: "12 Menit",
    price: "~Rp 10.000",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500",
    ingredients: [
      "1 papan tempe & 2 kotak tahu",
      "3 siung bawang merah & putih",
      "2 buah cabai merah",
      "3 sdm kecap manis",
    ],
    steps: [
      "Potong dadu tahu dan tempe, goreng setengah matang.",
      "Tumis bawang dan cabai sampai harum.",
      "Masukkan tahu, tempe, kecap, dan sedikit air.",
      "Masak hingga bumbu meresap.",
    ],
  },
];

export default function Page() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = DUMMY_RECIPES.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🍳 Resep Anak Kos</Text>
        <Text style={styles.headerSubtitle}>
          Makan enak, hemat, dan practical
        </Text>
      </View>

      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredRecipes.map((recipe) => (
          <TouchableOpacity
            key={recipe.id}
            activeOpacity={0.8}
            onPress={() =>
              router.push({
                pathname: "/detail",
                params: {
                  title: recipe.title,
                  category: recipe.category,
                  time: recipe.time,
                  price: recipe.price,
                  imageUrl: recipe.imageUrl,
                },
              })
            }
          >
            <RecipeCard
              title={recipe.title}
              category={recipe.category}
              time={recipe.time}
              price={recipe.price}
              imageUrl={recipe.imageUrl}
              onPress={() =>
                router.push({
                  pathname: "/detail",
                  params: {
                    title: recipe.title,
                    category: recipe.category,
                    time: recipe.time,
                    price: recipe.price,
                    imageUrl: recipe.imageUrl,
                    ingredients: JSON.stringify(recipe.ingredients),
                    steps: JSON.stringify(recipe.steps),
                  },
                })
              }
            />
          </TouchableOpacity>
        ))}
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#777777",
    marginTop: 2,
  },
  listContainer: {
    padding: 20,
  },
});
