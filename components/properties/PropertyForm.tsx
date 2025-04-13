import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  ActivityIndicator,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { addProperty, uploadPropertyImage } from '@services/propertyService';

const PropertyForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [area, setArea] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.uri]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !price || !address || !bedrooms || !bathrooms || !area) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    setLoading(true);

    try {
      const uploadedImages = await Promise.all(
        images.map(async (image) => await uploadPropertyImage(image))
      );

      const property = {
        title,
        description,
        price: parseFloat(price),
        address,
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        area: parseFloat(area),
        images: uploadedImages,
      };

      await addProperty(property);
      Alert.alert('Success', 'Property added successfully');
      router.push('/properties');
    } catch (error) {
      Alert.alert('Error', 'Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter property title"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter property description"
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Enter property price"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter property address"
      />

      <Text style={styles.label}>Bedrooms</Text>
      <TextInput
        style={styles.input}
        value={bedrooms}
        onChangeText={setBedrooms}
        placeholder="Enter number of bedrooms"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Bathrooms</Text>
      <TextInput
        style={styles.input}
        value={bathrooms}
        onChangeText={setBathrooms}
        placeholder="Enter number of bathrooms"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Area</Text>
      <TextInput
        style={styles.input}
        value={area}
        onChangeText={setArea}
        placeholder="Enter property area"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Images</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicker}>
        <Text style={styles.imagePickerText}>Pick Images</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#f4511e" />
      ) : (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  imagePicker: {
    backgroundColor: '#f4511e',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PropertyForm;