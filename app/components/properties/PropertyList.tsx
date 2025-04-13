import { FlatList, Text, StyleSheet, ActivityIndicator } from "react-native";
import PropertyCard from "./PropertyCard";

const PropertyList = ({ properties, loading }: { properties: any[]; loading: boolean }) => {
  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;

  if (properties.length === 0) return <Text style={styles.empty}>No properties found.</Text>;

  return (
    <FlatList
      data={properties}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PropertyCard property={item} />}
      contentContainerStyle={{ paddingBottom: 40 }}
    />
  );
};

const styles = StyleSheet.create({
  empty: {
    padding: 20,
    textAlign: "center",
    fontSize: 18,
    color: "#666",
  },
});

export default PropertyList;
