import React, { PropTypes } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Linking } from 'react-native';

import HTMLView from 'react-native-htmlview';

import socialBadge from '../../utils/social';

import DigiColors from '../../common/DigiColors';
import VenueFooter from '../venues/VenueFooter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DigiColors.primaryBackgroundColor,
  },
  scrollview: {
    flex: 1,
  },
  organization: {
    padding: 10,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatarContainer: {
    marginRight: 20,
  },
  avatar: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: DigiColors.primaryFontColor,
    marginTop: 10,
  },
  social: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
});

function Organization({ organization }) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.organization}>
          <View style={styles.header}>
            {
              organization.Organization.avatar ? (
                <View style={styles.avatarContainer}>
                  <Image
                    style={styles.avatar}
                    source={{ uri: organization.Organization.avatar }}
                  />
                </View>
              ) : null
            }
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {organization.Organization.name}
              </Text>
              <View style={styles.social}>
                {socialBadge('twitter', organization.Organization.Contacts)}
                {socialBadge('facebook', organization.Organization.Contacts)}
              </View>
            </View>
          </View>
          <HTMLView
            value={organization.Organization.description}
            onLinkPress={url => Linking.openURL(url)}
          />
        </View>
      </ScrollView>
      {
        organization.Venue && organization.Venue.id && <VenueFooter venue={organization.Venue} />
      }
    </View>
  );
}

export default Organization;

Organization.propTypes = {
  organization: PropTypes.object.isRequired,
};
