import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Answers } from 'react-native-fabric';

import DigiHeader from '../../common/DigiHeader';
import DigiTouchable from '../../common/DigiTouchable';
import DigiColors from '../../common/DigiColors';

import Editions from './Editions';
import Notifications from './Notifications';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    height: 56,
    alignItems: 'center',
    paddingLeft: 30,
    flex: 1,
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
          icon: require('../../common/img/hamburger.png'),
          onPress: openMainDrawer,
        }}
      />
      <View>
        <DigiTouchable
          key="1"
          onPress={() => {
            Answers.logContentView(
              'Choix de l\'édition',
              'editions',
              'settings/editions'
            );
            navigator.push({
              component: Editions,
            });
          }}
        >
          <View style={styles.itemContainer}>
            <Icon name="globe" size={20} color={DigiColors.primaryFontColor} style={styles.icon} />
            <Text style={styles.item}>
              Edition
            </Text>
          </View>
        </DigiTouchable>
        <DigiTouchable
          key="2"
          onPress={() => {
            Answers.logContentView(
              'Paramètres des Notifications',
              'notifications',
              'settings/notifications'
            );
            navigator.push({
              component: Notifications,
            });
          }}
        >
          <View style={styles.itemContainer}>
            <Icon name="bell-o" size={20} color={DigiColors.primaryFontColor} style={styles.icon} />
            <Text style={styles.item}>
              Notifications
            </Text>
          </View>
        </DigiTouchable>
      </View>
    </View>
  );
}

Settings.propTypes = {
  navigator: PropTypes.object.isRequired,
  openMainDrawer: PropTypes.func.isRequired,
};
