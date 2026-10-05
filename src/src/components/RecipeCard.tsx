import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RecipeProps {
  title: string;
  category: string;
  time: string;
  price: string;
  imageUrl: string;
}

export default function RecipeCard({
  title,
  category,
  time,
  price,
  imageUrl,
}: RecipeProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.detailText}>⏱️ {time}</Text>
          <Text style={styles.priceText}>💰 {price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 150,
  },
  infoContainer: {
    padding: 12,
  },
  category: {
    fontSize: 12,
    color: "#FF6B6B",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginVertical: 4,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  detailText: {
    fontSize: 13,
    color: "#666666",
  },
  priceText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2EC4B6",
  },
});
