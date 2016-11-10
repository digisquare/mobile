import React, { PropTypes } from 'react';
import { StyleSheet, View, Text, Linking, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment/min/moment-with-locales';

import DigiColors from '../../common/DigiColors';

moment.locale('fr');

const styles = StyleSheet.create({
  container: {
    backgroundColor: DigiColors.invertedBackgroundColor,
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
    color: DigiColors.invertedFontColor,
  },
  venueAddress: {
    color: DigiColors.invertedFontColor,
  },
  venueLastLine: {
    color: DigiColors.invertedFontColor,
  },
});

const goToMap = (oneliner) => {
  const mapsURL = Platform.OS === 'ios' ? (
    'https://maps.apple.com/?q='
  ) : (
    'https://maps.google.com?q='
  );
  Linking.openURL(mapsURL + oneliner);
};

export default function VenueFooter({ venue }) {
  return (
    <TouchableOpacity
      onPress={() => goToMap(venue.oneliner)}
      style={styles.container}
    >
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
          {`${venue.zipcode} ${venue.city}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

VenueFooter.propTypes = {
  venue: PropTypes.object.isRequired,
};
