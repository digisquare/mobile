import React, { PropTypes } from 'react';
import { View, ScrollView, StyleSheet, Text, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import moment from 'moment/min/moment-with-locales';
import HTMLView from 'react-native-htmlview';

import datetime from '../../utils/datetime';

import DigiHeader from '../../common/DigiHeader';
import DigiColors from '../../common/DigiColors';
import VenueFooter from '../venues/VenueFooter';
import OrganizationsRow from '../organizations/OrganizationsRow';

import backWhite from '../../common/img/back_white.png';

moment.locale('fr');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DigiColors.primaryBackgroundColor,
  },
  scrollview: {
    flex: 1,
  },
  event: {
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: DigiColors.primaryFontColor,
  },
  date: {
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 10,
    color: DigiColors.secondaryFontColor,
  },
  organizers: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '900',
    color: DigiColors.primaryFontColor,
  },
});

export default function Event({ navigator, event }) {
  return (
    <View style={styles.container}>
      <DigiHeader
        title="Évènement"
        leftItem={{
          icon: backWhite,
          onPress: () => navigator.pop(),
        }}
      />
      <ScrollView style={styles.scrollview}>
        <View style={styles.event}>
          <Text style={styles.title}>
            {event.Event.name}
          </Text>
          <Text style={styles.date}>
            <Icon name="clock-o" /> {datetime(event.Event.start_at, event.Event.end_at)}
          </Text>
          <HTMLView
            value={event.Event.description}
            onLinkPress={url => Linking.openURL(url)}
          />
          {
            event.Organization.length > 0 ? (
              <Text style={styles.organizers}>
                Organisé par :
              </Text>
            ) : null
          }
          {
            event.Organization.map(organization => (
              <OrganizationsRow
                key={organization.id}
                navigator={navigator}
                organization={{
                  Organization: organization,
                  Venue: organization.venue_id === event.Venue.id ? event.Venue : null,
                }}
              />
            ))
          }
        </View>
      </ScrollView>
      {
        event.Venue.id ? (
          <VenueFooter
            venue={event.Venue}
          />
        ) : null
      }
    </View>
  );
}

Event.propTypes = {
  navigator: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
};
