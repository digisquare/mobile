import React, { PropTypes } from 'react';
import { StyleSheet, View, Text, Linking, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment/min/moment-with-locales';

import DigiTouchable from '../../common/DigiTouchable';

moment.locale('fr');

const goToMap = oneliner => {
  const mapsURL = Platform.OS === 'ios' ? (
    'https://maps.apple.com/?q='
  ) : (
    'https://maps.google.com?q='
  );
  Linking.openURL(mapsURL + oneliner);
}

export default function VenueFooter({ venue }) {
  return (
    <DigiTouchable onPress={() => goToMap(venue.oneliner)}>
      <View style={styles.container}>
        <View style={styles.venue}>
          <View style={styles.venueDirections}>
            <Icon name="map-marker" size={30} color="white" />
          </View>
          <View style={styles.venueLocation}>
            <Text style={styles.venueName}>
              {venue.name}
            </Text>
            <Text style={styles.venueAddress}>
              {venue.address}
            </Text>
            <Text style={styles.venueLastLine}>
              {
                venue.zipcode
                + ' ' +
                venue.city
              }
            </Text>
          </View>
        </View>
      </View>
    </DigiTouchable>
  );
}

const styles = StyleSheet.create({
  venue: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'row',
  },
  venueDirections: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  venueLocation: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  venueName: {
    fontWeight: '500',
    color: 'white',
  },
  venueAddress: {
    color: 'white',
  },
  venueLastLine: {
    color: 'white',
  },
});

VenueFooter.propTypes = {
  venue: PropTypes.object.isRequired,
};
