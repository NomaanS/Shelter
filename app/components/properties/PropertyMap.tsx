import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface PropertyMapProps {
  latitude: number;
  longitude: number;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ latitude, longitude }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
};

export default PropertyMap;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  map: {
    flex: 1,
  },
});
