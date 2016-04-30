import React, { PropTypes, Text, View, Image, StyleSheet } from 'react-native';

import DigiTouchable from '../../common/DigiTouchable';

export default function OrganizationsRow({ organization, onSelect}) {
  return (
    <DigiTouchable onPress={onSelect}>
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
          <Text style={styles.date}>
            {
              organization.Venue.name ? (
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
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
});

OrganizationsRow.propTypes = {
  organization: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};