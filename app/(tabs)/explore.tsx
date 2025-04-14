import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { Ionicons } from '@expo/vector-icons';

export default function ExploreScreen() {
  const popularDestinations = [
    { id: '1', name: 'New York', count: '2,342 properties' },
    { id: '2', name: 'Los Angeles', count: '1,822 properties' },
    { id: '3', name: 'Miami', count: '1,355 properties' },
    { id: '4', name: 'Chicago', count: '1,177 properties' },
    { id: '5', name: 'San Francisco', count: '1,024 properties' },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Explore</ThemedText>
        <ThemedText style={styles.subtitle}>Discover your next stay</ThemedText>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search destinations"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Popular Destinations</ThemedText>
        <FlatList
          data={popularDestinations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.destinationItem}>
              <View style={styles.destinationContent}>
                <ThemedText style={styles.destinationName}>{item.name}</ThemedText>
                <ThemedText style={styles.destinationCount}>{item.count}</ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          )}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  destinationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  destinationContent: {
    flex: 1,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 3,
  },
  destinationCount: {
    fontSize: 14,
    opacity: 0.6,
  },
}); 