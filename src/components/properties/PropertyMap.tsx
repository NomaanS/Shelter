import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  title?: string;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ latitude, longitude, title }) => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title={title || 'Property Location'}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 16,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default PropertyMap;
