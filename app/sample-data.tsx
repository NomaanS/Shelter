import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { db } from '@/constants/firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Property } from '@/types/types';
import { useRouter } from 'expo-router';

// Sample properties data
const sampleProperties: Omit<Property, 'id' | 'createdAt'>[] = [
  {
    title: 'Luxury Oceanfront Villa',
    description: 'Beautiful oceanfront villa with private pool, direct beach access, and stunning sunset views. This spacious property features 4 bedrooms, 3 bathrooms, a fully equipped kitchen, and a large outdoor entertainment area.',
    price: 350,
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: '123 Beach Road, Malibu, CA 90265'
    },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1275&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1853&q=80'
    ],
    ownerId: 'sample-owner-1'
  },
  {
    title: 'Modern Downtown Apartment',
    description: 'Stylish apartment in the heart of downtown. Walking distance to restaurants, shops and entertainment. Features 2 bedrooms, 2 bathrooms, a modern kitchen, and a small balcony with city views.',
    price: 175,
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: '456 Main Street, Apt 7B, New York, NY 10001'
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
    ],
    ownerId: 'sample-owner-2'
  },
  {
    title: 'Cozy Mountain Cabin',
    description: 'Rustic cabin nestled in the mountains. Perfect for a weekend getaway. Features 2 bedrooms, 1 bathroom, a fireplace, and a deck with mountain views. Hiking trails nearby.',
    price: 120,
    location: {
      latitude: 39.5501,
      longitude: -105.7821,
      address: '789 Pine Trail, Aspen, CO 81611'
    },
    images: [
      'https://images.unsplash.com/photo-1590725140246-20acddc1ec6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80',
      'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80'
    ],
    ownerId: 'sample-owner-3'
  }
];

export default function SampleDataScreen() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const addSampleProperties = async () => {
    setLoading(true);
    setSuccess(false);
    
    try {
      const propertiesCollection = collection(db, 'properties');
      
      for (const property of sampleProperties) {
        await addDoc(propertiesCollection, {
          ...property,
          createdAt: new Date()
        });
      }
      
      setSuccess(true);
      Alert.alert(
        'Success', 
        'Sample properties have been added to the database', 
        [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
      );
    } catch (error) {
      console.error('Error adding sample properties:', error);
      Alert.alert('Error', 'Failed to add sample properties to the database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText style={styles.title}>Sample Data Utility</ThemedText>
        <ThemedText style={styles.description}>
          Use this page to populate your Firestore database with sample property listings.
          This will help you test the app functionality without manually creating properties.
        </ThemedText>

        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Properties to be added:</ThemedText>
          {sampleProperties.map((property, index) => (
            <View key={index} style={styles.propertyItem}>
              <ThemedText style={styles.propertyTitle}>{property.title}</ThemedText>
              <ThemedText numberOfLines={2} style={styles.propertyAddress}>
                {property.location.address}
              </ThemedText>
              <ThemedText style={styles.propertyPrice}>${property.price}/night</ThemedText>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.addButton, loading && styles.disabledButton]}
          onPress={addSampleProperties}
          disabled={loading || success}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {success ? 'Data Added Successfully' : 'Add Sample Properties'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 22,
  },
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  propertyItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  propertyAddress: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  propertyPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4a90e2',
  },
  addButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#a0c8f0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4a90e2',
  },
  backButtonText: {
    color: '#4a90e2',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 