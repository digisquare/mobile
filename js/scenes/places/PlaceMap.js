import React, { PropTypes, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default function PlaceMap({ venue }) {
  return (
    <MapView
      style={styles.map}
      region={{
        latitude: parseFloat(venue.latitude),
        longitude: parseFloat(venue.longitude),
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }}
    >
      <MapView.Marker 
        coordinate={{
          latitude: parseFloat(venue.latitude),
          longitude: parseFloat(venue.longitude),
        }}
        title={venue.name}
        description={venue.address}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

PlaceMap.propTypes = {
  venue: PropTypes.object.isRequired,
};
