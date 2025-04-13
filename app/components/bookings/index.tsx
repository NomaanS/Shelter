import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import PropertyList from "../../components/properties/PropertyList";
import { getAllProperties } from "@services/propertyService";
import { useRouter } from "expo-router";

const Home = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProperties();
      setProperties(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Your Next Shelter 🏡</Text>
        <Button title="Add New Property" onPress={() => router.push("/property/add")} />
      </View>
      <PropertyList properties={properties} loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default Home;
