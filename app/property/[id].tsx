import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@utils/firebaseConfig';
import PropertyMap from '@components/properties/PropertyMap';
import BookingForm from '@components/bookings/BookingForm';

const PropertyDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, 'properties', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProperty({ id: docSnap.id, ...docSnap.data() });
        } else {
          Alert.alert('Error', 'Property not found');
        }
      } catch (error) {
        console.error('Error fetching property:', error);
        Alert.alert('Error', 'Something went wrong while fetching property');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;
  }

  if (!property) {
    return <Text style={{ marginTop: 100, textAlign: 'center' }}>No property found</Text>;
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>{property.title}</Text>
      <Text style={{ fontSize: 16, marginBottom: 5 }}>Price: ${property.price}</Text>
      <Text style={{ fontSize: 16, marginBottom: 5 }}>Location: {property.location}</Text>
      <Text style={{ fontSize: 16, marginBottom: 15 }}>{property.description}</Text>

      <PropertyMap 
        latitude={property.latitude || 0} 
        longitude={property.longitude || 0} 
      />

      <View style={{ marginTop: 30 }}>
        <BookingForm property={property} />
      </View>
    </ScrollView>
  );
};

export default PropertyDetails;
