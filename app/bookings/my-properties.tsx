import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PropertyList from '@components/properties/PropertyList';
import { getPropertiesByUser } from '@services/propertyService';
import { getCurrentUser } from '@services/authService';
import type { Property } from '@utils/types';

export default function MyPropertiesScreen() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const currentUser = getCurrentUser();

  const fetchProperties = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      const data = await getPropertiesByUser(currentUser.uid);
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProperties();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Properties</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => router.push('/property/add')}
        >
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add New</Text>
        </TouchableOpacity>
      </View>

      <PropertyList 
        properties={properties} 
        loading={loading}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4511e',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '500',
    marginLeft: 4,
  },
});
