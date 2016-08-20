import React, { PropTypes } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Linking } from 'react-native';
import { connect } from 'react-redux';

import HTMLView from 'react-native-htmlview';

import socialBadge from '../../utils/social.js';

import DigiHeader from '../../common/DigiHeader';
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

const Organization = ({ navigator, organization, organizations }) => {
  const { edition_id: editionId, venue_id: venueId } = organization.Organization;
  if (editionId && organizations[editionId]) {
    const organizationsItems = organizations[editionId].items;
    if (venueId && !organization.Venue && organizationsItems.length > 0) {
      const venue = organizationsItems.find(item => item.Venue.id === venueId);
      organization.Venue = venue ? venue.Venue : null; // eslint-disable-line no-param-reassign
    }
  }
  const rightItem = organization.Organization.Contacts.website ? {
    icon: require('../../common/img/website.png'),
    onPress: () => Linking.openURL(organization.Organization.Contacts.website),
    title: 'website',
  } : null;
  return (
    <View style={styles.container}>
      <DigiHeader
        title="Organisateur"
        leftItem={{
          icon: require('../../common/img/back_white.png'),
          onPress: () => navigator.pop(),
        }}
        rightItem={rightItem}
      />
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
        organization.Venue && organization.Venue.id ? (
          <VenueFooter
            venue={organization.Venue}
          />
        ) : null
      }
    </View>
  );
};

Organization.propTypes = {
  navigator: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
  organizations: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  organizations: state.organizations,
});

export default connect(mapStateToProps)(Organization);
