import React, { PropTypes } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { connect } from 'react-redux'

import { toggleNotification } from '../../actions/settings.js';

import DigiHeader from '../../common/DigiHeader';
import DigiTouchable from '../../common/DigiTouchable';

const Notifications = ({ navigator, dispatch, editions, settings }) => {
  return (
    <View style={styles.container}>
      <DigiHeader
        title="Notifications"
        leftItem={{
          icon: require('../../common/img/back_white.png'),
          onPress: () => navigator.pop(),
        }}
      />
      <View>
        {
          editions.items.map(edition => {
            const value = settings.notifications[edition.name] || false;
            return (
              <View key={edition.id} style={styles.editionContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.editionName}>
                    {edition.name}
                  </Text>
                </View>
                <View style={styles.switchContainer}>
                  <Switch
                    onValueChange={value => dispatch(toggleNotification(edition.name, value))}
                    value={value}
                  />
                </View>
              </View>
            );
          })
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  editionContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 56,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
  },
  editionName: {
    fontSize: 18,
    fontWeight: '500',
  },
  switchContainer: {
    paddingTop: 15,
    paddingRight: 30,
  }
});

Notifications.propTypes = {
  navigator: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  editions: PropTypes.object.isRequired,
};

export default connect(state => state)(Notifications);
