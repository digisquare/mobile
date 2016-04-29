import React, { PropTypes, View, ScrollView, StyleSheet, Linking } from 'react-native';

import HTMLView from 'react-native-htmlview';

import DigiHeader from '../../common/DigiHeader';
import OrganizationVenue from './OrganizationVenue';

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
        <HTMLView
          value={organization.Organization.description}
          onLinkPress={url => Linking.openURL(url)}
        />
        {
          organization.Venue.id ? (
            <OrganizationVenue
              venue={organization.Venue}
            />
          ) : null
        }
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
});

Organization.propTypes = {
  organization: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
};
