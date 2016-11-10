import React, { PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import DigiHeader from './DigiHeader';
import DigiColors from './DigiColors';

import Events from '../scenes/events/Events';
import Organizations from '../scenes/organizations/Organizations';
import Settings from '../scenes/settings/Settings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DigiColors.primaryBackgroundColor,
  },
  itemContainer: {
    height: 56,
    alignItems: 'center',
    paddingLeft: 30,
    flexDirection: 'row',
  },
  item: {
    fontSize: 18,
    fontWeight: '900',
    color: DigiColors.secondaryFontColor,
  },
  icon: {
    width: 40,
  },
});

const DigiMainDrawer = ({ navigator }) => (
  <View style={styles.container}>
    <DigiHeader title="Digisquare" />
    <TouchableOpacity
      key="1"
      style={styles.itemContainer}
      onPress={() => {
        navigator.replace({
          component: Events,
        });
      }}
    >
      <Icon name="calendar" size={20} color={DigiColors.primaryFontColor} style={styles.icon} />
      <Text style={styles.item}>
        Évènements
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      key="2"
      style={styles.itemContainer}
      onPress={() => {
        navigator.replace({
          component: Organizations,
        });
      }}
    >
      <Icon name="users" size={20} color={DigiColors.primaryFontColor} style={styles.icon} />
      <Text style={styles.item}>
        Organisateurs
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      key="3"
      style={styles.itemContainer}
      onPress={() => {
        navigator.replace({
          component: Settings,
        });
      }}
    >
      <Icon name="cogs" size={20} color={DigiColors.primaryFontColor} style={styles.icon} />
      <Text style={styles.item}>
        Paramètres
      </Text>
    </TouchableOpacity>
  </View>
);

DigiMainDrawer.propTypes = {
  navigator: PropTypes.object.isRequired,
};

export default DigiMainDrawer;
