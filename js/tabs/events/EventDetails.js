'use strict';

import React, { Component, ScrollView, StyleSheet, Text, Linking } from 'react-native';
import Moment from 'moment/min/moment-with-locales';
import MapView from 'react-native-maps';
import HTMLView from 'react-native-htmlview'

Moment.locale('fr');

class EventDetails extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>
          {this.props.event.Event.name}
        </Text>
        <Text style={styles.date}>
          {Moment(this.props.event.Event.start_at).format('dddd D MMMM YYYY')}
        </Text>
        <HTMLView
          value={this.props.event.Event.description}
          onLinkPress={url => Linking.openURL(url)}
        />
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
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize:24,
    fontWeight: '500',
    marginBottom: 10
  },
  date: {
    marginBottom: 10
  },
  map: {
    height: 300,
    margin: 10,
    borderWidth: 1,
    marginBottom: 50,
  },
});

module.exports = EventDetails;
