import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { AuthContext } from '../_layout';

export default function PropertiesScreen() {
  const { user } = useContext(AuthContext);
  
  // This could be fetched from Firebase in a real app
  const properties = [
    { 
      id: '1', 
      name: 'Luxury Beach House', 
      location: 'Malibu, CA',
      price: '$250/night',
      image: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80'
    },
    { 
      id: '2', 
      name: 'Mountain Cabin', 
      location: 'Aspen, CO',
      price: '$180/night',
      image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80'
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>
        {user ? 'Your Properties' : 'Available Properties'}
      </ThemedText>
      
      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/properties/${item.id}`} asChild>
            <TouchableOpacity style={styles.propertyCard}>
              <Image
                source={{ uri: item.image }}
                style={styles.propertyImage}
                resizeMode="cover"
              />
              <View style={styles.propertyInfo}>
                <ThemedText style={styles.propertyName}>{item.name}</ThemedText>
                <ThemedText style={styles.propertyLocation}>{item.location}</ThemedText>
                <ThemedText style={styles.propertyPrice}>{item.price}</ThemedText>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  propertyCard: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  propertyImage: {
    width: '100%',
    height: 200,
  },
  propertyInfo: {
    padding: 15,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  propertyLocation: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  propertyPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a90e2',
  },
}); 