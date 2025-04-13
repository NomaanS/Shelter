import React from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import PropertyCard from './PropertyCard';
import { Property } from '../../utils/types';

interface PropertyListProps {
  properties: Property[];
  loading: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
}

const PropertyList: React.FC<PropertyListProps> = ({ 
  properties, 
  loading, 
  onRefresh,
  refreshing = false
}) => {
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    );
  }

  if (properties.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No properties found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={properties}
      keyExtractor={(item) => item.id || Math.random().toString()}
      renderItem={({ item }) => <PropertyCard property={item} />}
      onRefresh={onRefresh}
      refreshing={refreshing}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default PropertyList;
