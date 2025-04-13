import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import PropertyCard from "@components/properties/PropertyCard";
import { getAllProperties } from "@services/propertyService";
import { Property } from "@utils/types";

const Home = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProperties = async () => {
      const data = await getAllProperties();
      setProperties(data);
      setLoading(false);
    };
    getProperties();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Available Properties</Text>
      {properties.map((property: Property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default Home;
