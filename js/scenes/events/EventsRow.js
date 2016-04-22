import React, { PropTypes, Text, View, Image, StyleSheet } from 'react-native';
import moment from 'moment/min/moment-with-locales';

import DigiTouchable from '../../common/DigiTouchable';

moment.locale('fr');

export default function EventsRow({ event, onSelect}) {
  return (
    <DigiTouchable onPress={onSelect}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {
            event.Organization[0] ? (
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
            {
              event.Venue.name
              + ', '
              + moment(event.Event.start_at).fromNow()
            }
          </Text>
          <View style={styles.separator} />
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
    paddingBottom: 0,
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
    fontSize:18,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
    marginTop: 10,
  },
});

EventsRow.propTypes = {
  event: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};
