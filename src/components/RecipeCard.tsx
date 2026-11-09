import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RecipeCardProps {
  title: string;
  category: string;
  time: string;
  price?: string;
  difficulty?: string;
  rating?: number;
  imageUrl: string;
  onPress?: () => void;
}

export default function RecipeCard({
  title,
  category,
  time,
  price,
  difficulty,
  rating,
  imageUrl,
  onPress,
}: RecipeCardProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.category}>{category}</Text>
          {rating ? (
            <Text style={styles.ratingText}>⭐ {rating.toFixed(1)}</Text>
          ) : null}
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.detailsRow}>
          <Text style={styles.detailText}>⏱️ {time}</Text>
          {difficulty ? (
            <Text style={styles.difficultyBadge}>{difficulty}</Text>
          ) : price ? (
            <Text style={styles.priceText}>💰 {price}</Text>
          ) : null}
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
    height: 160,
    backgroundColor: "#f2f2f2",
  },
  infoContainer: {
    padding: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  category: {
    fontSize: 12,
    color: "#FF6B6B",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#F39C12",
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
    alignItems: "center",
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
  difficultyBadge: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4A90E2",
    backgroundColor: "#EBF5FB",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
});
