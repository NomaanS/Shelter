import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const PropertyCard = ({ property }: { property: any }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/property/${property.id}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image
        source={{ uri: property.image || "https://via.placeholder.com/300" }}
        style={styles.image}
      />
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
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: 16,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontSize: 16,
    marginTop: 4,
  },
});

export default PropertyCard;
