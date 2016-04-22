'use strict';

import React, { Component, ScrollView, StyleSheet, Text, Linking } from 'react-native';
import MapView from 'react-native-maps';

class PlaceMap extends Component {
  render() {
    return (
      <MapView
        style={styles.map}
        region={{
          latitude: parseFloat(this.props.event.Venue.latitude),
          longitude: parseFloat(this.props.event.Venue.longitude),
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      >
        <MapView.Marker 
          coordinate={{
            latitude: parseFloat(this.props.event.Venue.latitude),
            longitude: parseFloat(this.props.event.Venue.longitude),
          }}
          title={this.props.event.Venue.name}
          description={this.props.event.Venue.address}
        />
      </MapView>
    );
  }
};

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

module.exports = PlaceMap;
