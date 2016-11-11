import React, { PropTypes } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Answers } from 'react-native-fabric';

import Router from '../../router';
import DigiColors from '../../common/DigiColors';

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
    fontWeight: '900',
    color: DigiColors.secondaryFontColor,
  },
  venue: {
    color: DigiColors.secondaryFontColor,
  },
});

const selectOrganization = (navigator, organization) => {
  Answers.logContentView(
    `${organization.Organization.name}`,
    'organization',
    `organizations/${organization.Organization.id}`,
  );
  navigator.push(Router.getRoute('organization', { organization }));
};

export default function OrganizationsRow({ navigator, organization }) {
  return (
    <TouchableOpacity
      onPress={() => selectOrganization(navigator, organization)}
      style={styles.container}
    >
      <View style={styles.avatarContainer}>
        {
          organization.Organization.avatar ? (
            <Image
              style={styles.avatar}
              source={{ uri: organization.Organization.avatar }}
            />
          ) : null
        }
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {organization.Organization.name}
        </Text>
        <Text style={styles.venue}>
          {
            organization.Venue && organization.Venue.name ? (
              `@ ${organization.Venue.name}`
            ) : null
          }
        </Text>
      </View>
    </TouchableOpacity>
  );
}

OrganizationsRow.propTypes = {
  navigator: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
};
