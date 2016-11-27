import React, { Component, PropTypes } from 'react';
import { StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import DigiColors from '../../common/DigiColors';

import Organization from './Organization';

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
});

class OrganizationContainer extends Component {
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
      <Organization organization={organization} />
    );
  }
}

const mapStateToProps = state => ({
  organizations: state.organizations,
});

export default connect(mapStateToProps)(OrganizationContainer);

OrganizationContainer.propTypes = {
  organization: PropTypes.object.isRequired,
  organizations: PropTypes.object.isRequired,
};
