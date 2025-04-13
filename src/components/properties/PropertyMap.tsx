import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Property } from '../../utils/types';

interface PropertyMapProps {
  property: Property;
  style?: any;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ property, style }) => {
  // Default to a position if lat/lng are not available
  const latitude = property?.latitude || 0;
  const longitude = property?.longitude || 0;

  // Only render map if we have valid coordinates
  if (!latitude || !longitude) {
    return <View style={[styles.container, style]} />
  }

  return (
    <View style={[styles.container, style]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={false}
        showsMyLocationButton={false}
        toolbarEnabled={false}
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
          title={property.title}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default PropertyMap;
