import React, { PropTypes, StyleSheet, View, Text, Linking, Image, Platform } from 'react-native';
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

export default function EventVenue({ venue }) {
  return (
    <DigiTouchable onPress={() => goToMap(venue.oneliner)}>
      <View style={styles.venue}>
        <View style={styles.venueDirections}>
          <Image
            style={styles.venueDirectionsIcon}
            source={require('../../common/img/directions.png')}
          />
        </View>
        <View style={styles.venueAddress}>
          <Text style={styles.venueName}>
            {venue.name}
          </Text>
          <Text>
            {venue.address}
          </Text>
          <Text>
            {
              venue.zipcode
              + ' ' +
              venue.city
            }
          </Text>
        </View>
      </View>
    </DigiTouchable>
  );
}

const styles = StyleSheet.create({
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

EventVenue.propTypes = {
  venue: PropTypes.object.isRequired,
};
