import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import DigiHeader from './DigiHeader';
import DigiTouchable from './DigiTouchable';

import Events from '../scenes/events/Events';
import Organizations from '../scenes/organizations/Organizations';
import Settings from '../scenes/settings/Settings';

const DigiMainDrawer = ({ navigator }) => {
  return (
    <View>
      <DigiHeader
        title="Digisquare"
      />
      <DigiTouchable
        key="1"
        onPress={() => {
          navigator.replace({
            component: Events,
          });
        }}
      >
        <View style={styles.itemContainer}>
          <Icon name="calendar" size={20} color="black" style={styles.icon} />
          <Text style={styles.item}>
            Évènements
          </Text>
        </View>
      </DigiTouchable>
      <DigiTouchable
        key="2"
        onPress={() => {
          navigator.replace({
            component: Organizations,
          });
        }}
      >
        <View style={styles.itemContainer}>
          <Icon name="users" size={20} color="black" style={styles.icon} />
          <Text style={styles.item}>
            Organisateurs
          </Text>
        </View>
      </DigiTouchable>
      <DigiTouchable
        key="3"
        onPress={() => {
          navigator.replace({
            component: Settings,
          });
        }}
      >
        <View style={styles.itemContainer}>
          <Icon name="cogs" size={20} color="black" style={styles.icon} />
          <Text style={styles.item}>
            Paramètres
          </Text>
        </View>
      </DigiTouchable>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 56,
    alignItems: 'center',
    paddingLeft: 30,
    flex: 1,
    flexDirection: 'row',
  },
  item: {
    fontSize: 18,
    fontWeight: '500',
  },
  icon: {
    width: 40,
  },
});

DigiMainDrawer.propTypes = {
  navigator: PropTypes.object.isRequired,
};

export default DigiMainDrawer;
