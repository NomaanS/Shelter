import React from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import PropertyCard from './PropertyCard';
import { Property } from '@utils/types';

interface PropertyListProps {
  properties: Property[];
  loading: boolean;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, loading }) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    );
  }

  if (properties.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No properties found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={properties}
      keyExtractor={(item) => item.id!}
      renderItem={({ item }) => <PropertyCard property={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#9e9e9e',
  },
  listContainer: {
    padding: 16,
  },
});

export default PropertyList;