import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface LoadingProps {
  message?: string;
}

export default function Loading({
  message = "Memuat data resep...",
}: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF6B6B" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    color: "#666666",
  },
});
