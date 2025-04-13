import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const PropertyCard = ({ property }: { property: any }) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(`/property/${property.id}`)} style={styles.card}>
      <Image source={{ uri: property.image || "https://via.placeholder.com/300" }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.location}>{property.location}</Text>
        <Text style={styles.price}>€{property.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 160,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  location: {
    color: "#666",
    marginTop: 4,
  },
  price: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default PropertyCard;
