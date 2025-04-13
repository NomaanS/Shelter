import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Property } from '../../utils/types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const handlePress = () => {
    router.push(`/property/${property.id}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image 
        source={{ uri: property.images[0] || 'https://via.placeholder.com/300x200?text=No+Image' }} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.price}>${property.price.toLocaleString()}</Text>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.address}>{property.address}</Text>
        <View style={styles.details}>
          <Text style={styles.detail}>{property.bedrooms} beds</Text>
          <Text style={styles.detail}>{property.bathrooms} baths</Text>
          <Text style={styles.detail}>{property.area} sqft</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f4511e',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    marginTop: 8,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginRight: 16,
  },
});

export default PropertyCard;
