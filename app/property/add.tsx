// 📄 app/property/add.tsx
import { useState } from "react";
import { Text, TextInput, Button, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { addProperty } from "@/services/propertyService";
import { getAuth } from "firebase/auth";

const AddProperty = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const router = useRouter();

  const handleAdd = async () => {
    if (!title || !location || !price) {
      Alert.alert("All fields are required");
      return;
    }

    try {
      const user = getAuth().currentUser;
      if (!user) throw new Error("Not authenticated");

      const newAd = {
        title,
        location,
        price: parseFloat(price),
        image,
        createdBy: user.uid,
        createdAt: new Date().toISOString(),
      };

      await addProperty(newAd);
      Alert.alert("Success", "Property added!");
      router.push("/");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add a New Property</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      <TextInput
        placeholder="Price in Euro"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Image URL (optional)"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />

      <Button title="Add Property" onPress={handleAdd} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
});

export default AddProperty;
