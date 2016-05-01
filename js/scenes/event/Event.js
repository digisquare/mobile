import React, { PropTypes } from 'react';
import { View, ScrollView, StyleSheet, Text, Linking } from 'react-native';

import moment from 'moment/min/moment-with-locales';
import HTMLView from 'react-native-htmlview';

import DigiHeader from '../../common/DigiHeader';
import EventVenue from './EventVenue';

moment.locale('fr');

export default function Event({ event, navigator }) {
  return (
    <View style={styles.container}>
      <DigiHeader
        title={event.Event.name}
        leftItem={{
          icon: require('../../common/img/back_white.png'),
          onPress: () => navigator.pop(),
        }}
      />
      <ScrollView style={styles.scrollview}>
        <Text style={styles.date}>
          {moment(event.Event.start_at).format('dddd D MMMM YYYY, HH:mm')}
        </Text>
        <HTMLView
          value={event.Event.description}
          onLinkPress={url => Linking.openURL(url)}
        />
        <EventVenue
          venue={event.Venue}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    padding: 10,
  },
  date: {
    fontSize: 18,
    marginBottom: 10,
  },
});

Event.propTypes = {
  event: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};
