import React, { PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Answers } from 'react-native-fabric';

import Router from '../../router';
import DigiColors from '../../common/DigiColors';

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

export default function Settings({ navigator }) {
  Answers.logContentView('Paramètres', 'settings', 'settings');
  return (
    <View style={styles.container}>
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
            navigator.push(Router.getRoute('editions'));
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
            navigator.push(Router.getRoute('notifications'));
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
};
