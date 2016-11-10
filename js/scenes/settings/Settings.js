import React, { PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Answers } from 'react-native-fabric';

import DigiHeader from '../../common/DigiHeader';
import DigiColors from '../../common/DigiColors';

import Editions from './Editions';
import Notifications from './Notifications';

import hamburger from '../../common/img/hamburger.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default function Settings({ navigator, openMainDrawer }) {
  Answers.logContentView('Paramètres', 'settings', 'settings');
  return (
    <View style={styles.container}>
      <DigiHeader
        title="Paramètres"
        leftItem={{
          icon: hamburger,
          onPress: openMainDrawer,
        }}
      />
      <View style={styles.container}>
        <TouchableOpacity
          key="1"
          style={styles.itemContainer}
          onPress={() => {
            Answers.logContentView(
              'Choix de l\'édition',
              'editions',
              'settings/editions',
            );
            navigator.push({
              component: Editions,
            });
          }}
        >
          <Icon name="globe" size={20} color={DigiColors.primaryFontColor} style={styles.icon} />
          <Text style={styles.item}>
            Edition
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          key="2"
          style={styles.itemContainer}
          onPress={() => {
            Answers.logContentView(
              'Paramètres des Notifications',
              'notifications',
              'settings/notifications',
            );
            navigator.push({
              component: Notifications,
            });
          }}
        >
          <Icon name="bell-o" size={20} color={DigiColors.primaryFontColor} style={styles.icon} />
          <Text style={styles.item}>
            Notifications
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

Settings.propTypes = {
  navigator: PropTypes.object.isRequired,
  openMainDrawer: PropTypes.func.isRequired,
};
