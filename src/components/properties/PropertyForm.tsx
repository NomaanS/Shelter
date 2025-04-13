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
import { addProperty, uploadPropertyImage } from '../../services/propertyService';

const PropertyForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [area, setArea] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant camera roll permissions to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (!title || !description || !price || !address || !bedrooms || !bathrooms || !area || !latitude || !longitude || images.length === 0) {
      Alert.alert('Missing Information', 'Please fill in all fields and add at least one image.');
      return;
    }

    setLoading(true);
    try {
      // Upload images and get URLs
      const imageUrls = await Promise.all(images.map(image => uploadPropertyImage(image)));

      // Create property object
      const propertyData = {
        title,
        description,
        price: parseFloat(price),
        address,
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        area: parseFloat(area),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        images: imageUrls,
      };

      // Add property to database
      const propertyId = await addProperty(propertyData);
      Alert.alert('Success', 'Property listed successfully!');
      router.replace(`/property/${propertyId}`);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create property listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>List Your Property</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="e.g., Cozy 2-Bedroom Apartment"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe your property..."
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Price ($)</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="e.g., 250000"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Full address"
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>Bedrooms</Text>
          <TextInput
            style={styles.input}
            value={bedrooms}
            onChangeText={setBedrooms}
            placeholder="e.g., 2"
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.label}>Bathrooms</Text>
          <TextInput
            style={styles.input}
            value={bathrooms}
            onChangeText={setBathrooms}
            placeholder="e.g., 1"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Area (sq ft)</Text>
        <TextInput
          style={styles.input}
          value={area}
          onChangeText={setArea}
          placeholder="e.g., 1200"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>Latitude</Text>
          <TextInput
            style={styles.input}
            value={latitude}
            onChangeText={setLatitude}
            placeholder="e.g., 37.7749"
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.label}>Longitude</Text>
          <TextInput
            style={styles.input}
            value={longitude}
            onChangeText={setLongitude}
            placeholder="e.g., -122.4194"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Images</Text>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>Add Image</Text>
        </TouchableOpacity>
        
        {images.length > 0 && (
          <ScrollView horizontal style={styles.imagePreviewContainer}>
            {images.map((image, index) => (
              <Image 
                key={index} 
                source={{ uri: image }} 
                style={styles.imagePreview} 
              />
            ))}
          </ScrollView>
        )}
      </View>

      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>List Property</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageButton: {
    backgroundColor: '#4a90e2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  submitButton: {
    backgroundColor: '#f4511e',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 24,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default PropertyForm;
