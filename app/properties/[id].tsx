import { useLocalSearchParams, Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { Ionicons } from '@expo/vector-icons';

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams();
  const [booking, setBooking] = useState(false);
  
  // This would be fetched from Firebase in a real app
  const property = {
    id: id as string,
    name: id === '1' ? 'Luxury Beach House' : 'Mountain Cabin',
    location: id === '1' ? 'Malibu, CA' : 'Aspen, CO',
    price: id === '1' ? '$250/night' : '$180/night',
    image: id === '1' 
      ? 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80'
      : 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80',
    description: id === '1'
      ? 'Beautiful beach house with ocean views. Perfect for a romantic getaway or family vacation. Features a private pool, 3 bedrooms, and a fully equipped kitchen.'
      : 'Cozy mountain cabin with stunning views. Enjoy the fireplace on cold nights and the large deck for warmer days. 2 bedrooms and a full kitchen.',
    beds: id === '1' ? 3 : 2,
    baths: id === '1' ? 2.5 : 1,
    guests: id === '1' ? 6 : 4,
  };

  const handleBooking = () => {
    setBooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      setBooking(false);
      alert('Booking successful!');
    }, 1500);
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: property.name }} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image 
          source={{ uri: property.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.content}>
          <ThemedText style={styles.name}>{property.name}</ThemedText>
          <ThemedText style={styles.location}>{property.location}</ThemedText>
          
          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Ionicons name="bed-outline" size={20} color="#666" />
              <ThemedText style={styles.detailText}>{property.beds} beds</ThemedText>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="water-outline" size={20} color="#666" />
              <ThemedText style={styles.detailText}>{property.baths} baths</ThemedText>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="people-outline" size={20} color="#666" />
              <ThemedText style={styles.detailText}>{property.guests} guests</ThemedText>
            </View>
          </View>
          
          <ThemedText style={styles.sectionTitle}>Description</ThemedText>
          <ThemedText style={styles.description}>{property.description}</ThemedText>
          
          <ThemedText style={styles.price}>{property.price}</ThemedText>
          
          <TouchableOpacity style={styles.bookButton} onPress={handleBooking} disabled={booking}>
            <ThemedText style={styles.bookButtonText}>
              {booking ? "Processing..." : "Book Now"}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 15,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 5,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 20,
  },
  bookButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 