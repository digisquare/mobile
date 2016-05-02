import React, { PropTypes } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

import DigiTouchable from '../../common/DigiTouchable';

import Organization from '../organization/Organization';

const selectOrganization = (navigator, organization) => {
  navigator.push({
    component: Organization,
    passProps: {
      organization: organization,
    },
  });
}

export default function OrganizationsRow({ navigator, organization }) {
  return (
    <DigiTouchable onPress={() => selectOrganization(navigator, organization)}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {
            organization.Organization.avatar ? (
              <Image
                style={styles.avatar}
                source={{uri: organization.Organization.avatar}}
              />
            ) : null
          }
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {organization.Organization.name}
          </Text>
          <Text>
            {
              organization.Venue && organization.Venue.name ? (
                `@ ${organization.Venue.name}`
              ) : null
            }
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
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
});

OrganizationsRow.propTypes = {
  navigator: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
};
