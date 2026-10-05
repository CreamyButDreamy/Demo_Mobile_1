import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RecipeCard from "../src/components/RecipeCard";

const DUMMY_RECIPES = [
  {
    id: "1",
    title: "Nasi Goreng Tang tanggal Tua",
    category: "Serba Telur",
    time: "10 Menit",
    price: "~Rp 7.000",
    imageUrl:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=500",
  },
  {
    id: "2",
    title: "Omelet Mie Instant Spesial Kos",
    category: "Olahan Mie",
    time: "15 Menit",
    price: "~Rp 6.000",
    imageUrl:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=500",
  },
  {
    id: "3",
    title: "Tumis Tahu Tempe Kecap",
    category: "Hemat & Sehat",
    time: "12 Menit",
    price: "~Rp 10.000",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500",
  },
];

export default function Page() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🍳 Resep Anak Kos</Text>
        <Text style={styles.headerSubtitle}>
          Makan enak, hemat, dan praktis
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {DUMMY_RECIPES.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            category={recipe.category}
            time={recipe.time}
            price={recipe.price}
            imageUrl={recipe.imageUrl}
          />
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
