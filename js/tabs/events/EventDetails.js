'use strict';

import React, { Component, ScrollView, StyleSheet, View, Text, Linking, Image, Platform } from 'react-native';
import Moment from 'moment/min/moment-with-locales';
import HTMLView from 'react-native-htmlview'

import DigiTouchable from '../../common/DigiTouchable';

import PlaceMap from '../places/PlaceMap';

Moment.locale('fr');

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.goToMap = this.goToMap.bind(this);
  }

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
        <DigiTouchable onPress={this.goToMap}>
          <View style={styles.venue}>
            <View style={styles.venueDirections}>
              <Image
                style={styles.venueDirectionsIcon}
                source={require('../../common/img/directions.png')}
              />
            </View>
            <View style={styles.venueAddress}>
              <Text style={styles.venueName}>
                {this.props.event.Venue.name}
              </Text>
              <Text>
                {this.props.event.Venue.address}
              </Text>
              <Text>
                {
                  this.props.event.Venue.zipcode
                  + ' ' +
                  this.props.event.Venue.city
                }
              </Text>
            </View>
          </View>
        </DigiTouchable>
      </ScrollView>
    );
  }

  goToMap() {
    const mapsURL = Platform.OS === 'ios' ? (
      'https://maps.apple.com/?q='
    ) : (
      'https://maps.google.com?q='
    );
    Linking.openURL(mapsURL + this.props.event.Venue.oneliner);
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  date: {
    fontSize: 18,
    marginBottom: 10
  },
  venue: {
    marginTop: 10,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
  },
  venueDirections: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'black',
    padding: 10,
  },
  venueDirectionsIcon: {
    width: 40,
    height: 40,
  },
  venueAddress: {
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 2,
  },
  venueName: {
    fontWeight: '500',
  },
});

module.exports = EventDetails;
