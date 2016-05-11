import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Answers } from 'react-native-fabric';

import DigiHeader from '../../common/DigiHeader';
import DigiTouchable from '../../common/DigiTouchable';

import Notifications from './Notifications';

const Settings = class Settings extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    Answers.logContentView('Paramètres', 'settings', 'settings');
  }

  render() {
    const { navigator, openMainDrawer } = this.props;
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
              <Icon name="bell-o" size={20} color="black" style={styles.icon} />
              <Text style={styles.item}>
                Notifications
              </Text>
            </View>
          </DigiTouchable>
        </View>
      </View>
    );
  }
}

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
    fontWeight: '500',
  },
  icon: {
    width: 40,
  },
});

Settings.propTypes = {
  navigator: PropTypes.object.isRequired,
  openMainDrawer: PropTypes.func.isRequired,
};

export default connect(state => state)(Settings);
