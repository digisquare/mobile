import React, { PropTypes } from 'react';
import { View, ScrollView, StyleSheet, Linking } from 'react-native';

import HTMLView from 'react-native-htmlview';

import DigiHeader from '../../common/DigiHeader';
import VenueFooter from '../venues/VenueFooter';

export default function Organization({ organization, navigator }) {
  return (
    <View style={styles.container}>
      <DigiHeader
        title={organization.Organization.name}
        leftItem={{
          icon: require('../../common/img/back_white.png'),
          onPress: () => navigator.pop(),
        }}
      />
      <ScrollView style={styles.scrollview}>
        <View style={styles.organization}>
          <HTMLView
            value={organization.Organization.description}
            onLinkPress={url => Linking.openURL(url)}
          />
        </View>
      </ScrollView>
      {
        organization.Venue.id ? (
          <VenueFooter
            venue={organization.Venue}
          />
        ) : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollview: {
    flex: 1,
  },
  organization: {
    padding: 10,
  },
});

Organization.propTypes = {
  organization: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};
