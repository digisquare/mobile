import React, { PropTypes, ScrollView, StyleSheet, Text, Linking } from 'react-native';

import moment from 'moment/min/moment-with-locales';
import HTMLView from 'react-native-htmlview';

import EventVenue from './EventVenue';

moment.locale('fr');

export default function Event({ event }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {event.Event.name}
      </Text>
      <Text style={styles.date}>
        {moment(event.Event.start_at).format('dddd D MMMM YYYY')}
      </Text>
      <HTMLView
        value={event.Event.description}
        onLinkPress={url => Linking.openURL(url)}
      />
      <EventVenue
        venue={event.Venue}
      />
    </ScrollView>
  );
}

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
    marginBottom: 10,
  },
});

Event.propTypes = {
  event: PropTypes.object.isRequired,
};
