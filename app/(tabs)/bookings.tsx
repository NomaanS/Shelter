import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';

export default function BookingsScreen() {
  // This could be fetched from Firebase in a real app
  const bookings = [
    { id: '1', propertyName: 'Beach House', checkIn: '2025-06-01', checkOut: '2025-06-07' },
    { id: '2', propertyName: 'Mountain Cabin', checkIn: '2025-07-15', checkOut: '2025-07-20' },
  ];

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Your Bookings</ThemedText>
      
      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookingCard}>
              <ThemedText style={styles.propertyName}>{item.propertyName}</ThemedText>
              <ThemedText>Check-in: {item.checkIn}</ThemedText>
              <ThemedText>Check-out: {item.checkOut}</ThemedText>
            </View>
          )}
        />
      ) : (
        <ThemedText style={styles.emptyText}>You don't have any bookings yet.</ThemedText>
      )}
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
  bookingCard: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  propertyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    opacity: 0.7,
  },
}); 