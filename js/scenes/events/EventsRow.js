import React, { PropTypes } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment/min/moment-with-locales';
import { Answers } from 'react-native-fabric';

import DigiColors from '../../common/DigiColors';

import Event from '../event/Event';

moment.locale('fr');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    height: 60,
  },
  avatarContainer: {
    width: 50,
  },
  avatar: {
    width: 40,
    height: 40,
    marginTop: 3,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: DigiColors.secondaryFontColor,
  },
  date: {
    color: DigiColors.secondaryFontColor,
  },
});

const selectEvent = (navigator, event) => {
  Answers.logContentView(
    `${event.Event.name}`,
    'event',
    `events/${event.Event.id}`,
  );
  navigator.push({
    component: Event,
    passProps: {
      event,
    },
  });
};

export default function EventsRow({ rowID, navigator, event }) {
  const time = moment(event.Event.start_at).format('HH:mm');
  const place = event.Venue.name;
  const timeAndPlace = time === '00:00' ? place : `${time} @ ${place}`;
  return (
    <TouchableOpacity
      testID={`EventsRow-${rowID}`}
      onPress={() => selectEvent(navigator, event)}
      style={styles.container}
    >
      <View style={styles.avatarContainer}>
        {
          event.Organization[0] && event.Organization[0].avatar ? (
            <Image
              style={styles.avatar}
              source={{ uri: event.Organization[0].avatar }}
            />
          ) : null
        }
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {event.Event.name}
        </Text>
        <Text style={styles.date}>
          {timeAndPlace}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

EventsRow.propTypes = {
  rowID: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
};
