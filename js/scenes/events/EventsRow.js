import React, { PropTypes, Text, View, Image, StyleSheet } from 'react-native';
import moment from 'moment/min/moment-with-locales';

import DigiTouchable from '../../common/DigiTouchable';

moment.locale('fr');

export default function EventsRow({ event, onSelect}) {
  const time = moment(event.Event.start_at).format('HH:mm');
  const place = event.Venue.name;
  const timeAndPlace = time === '00:00' ? place : time + ' @ ' + place;
  return (
    <DigiTouchable onPress={onSelect}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {
            event.Organization[0] && event.Organization[0].avatar ? (
              <Image
                style={styles.avatar}
                source={{uri: event.Organization[0].avatar}}
              />
            ) : null
          }
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {event.Event.name}
          </Text>
          <Text style={styles.date}>
            {timeAndPlace}
          </Text>
        </View>
      </View>
    </DigiTouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
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
    fontWeight: '500',
  },
});

EventsRow.propTypes = {
  event: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};
