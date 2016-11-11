import React, { Component, PropTypes } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import HTMLView from 'react-native-htmlview';

import socialBadge from '../../utils/social';

import DigiColors from '../../common/DigiColors';
import VenueFooter from '../venues/VenueFooter';

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
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

class Organization extends Component {
  static route = {
    navigationBar: {
      title: 'Organisateur',
      renderRight: (route) => {
        const { params: { organization } } = route;
        return organization.Organization.Contacts.website && (
          <TouchableOpacity
            onPress={() => Linking.openURL(organization.Organization.Contacts.website)}
            style={styles.itemWrapper}
          >
            <Icon name="link" size={20} color={DigiColors.invertedFontColor} />
          </TouchableOpacity>
        );
      },
    },
  }

  render() {
    const { organization, organizations } = this.props;
    const { edition_id: editionId, venue_id: venueId } = organization.Organization;

    if (editionId && organizations[editionId]) {
      const organizationsItems = organizations[editionId].items;
      if (venueId && !organization.Venue && organizationsItems.length > 0) {
        const venue = organizationsItems.find(item => item.Venue.id === venueId);
        organization.Venue = venue ? venue.Venue : null; // eslint-disable-line no-param-reassign
      }
    }

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
}

const mapStateToProps = state => ({
  organizations: state.organizations,
});

export default connect(mapStateToProps)(Organization);

Organization.propTypes = {
  organization: PropTypes.object.isRequired,
  organizations: PropTypes.object.isRequired,
};
