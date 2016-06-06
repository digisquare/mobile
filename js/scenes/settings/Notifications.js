import React, { PropTypes } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { connect } from 'react-redux'

import { toggleNotification } from '../../actions/settings.js';

import DigiHeader from '../../common/DigiHeader';

const Notifications = ({ navigator, onToggleNotification, editions, notifications }) => {
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
            const value = notifications[edition.name] || false;
            return (
              <View key={edition.id} style={styles.editionContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.editionName}>
                    {edition.name}
                  </Text>
                </View>
                <View style={styles.switchContainer}>
                  <Switch
                    onValueChange={value => onToggleNotification(edition.name, value)}
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
    fontWeight: '900',
    color: 'grey',
  },
  switchContainer: {
    paddingTop: 15,
    paddingRight: 30,
  },
});

Notifications.propTypes = {
  navigator: PropTypes.object.isRequired,
  onToggleNotification: PropTypes.func.isRequired,
  editions: PropTypes.object.isRequired,
  notifications: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    editions: state.editions,
    notifications: state.settings.notifications,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleNotification: (name, value) => {
      dispatch(toggleNotification(name, value));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
