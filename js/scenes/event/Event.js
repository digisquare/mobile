import React, { PropTypes, View, ScrollView, StyleSheet, Text, Linking } from 'react-native';

import moment from 'moment/min/moment-with-locales';
import HTMLView from 'react-native-htmlview';

import DigiHeader from '../../common/DigiHeader';
import EventVenue from './EventVenue';

moment.locale('fr');

export default function Event({ event, navigator }) {
  return (
    <View style={styles.container}>
      <DigiHeader
        title="Évement"
        leftItem={{
          icon: require('../../common/img/back_white.png'),
          onPress: () => navigator.pop(),
        }}
      />
      <ScrollView style={styles.scrollview}>
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
  navigator: PropTypes.object.isRequired,
};
