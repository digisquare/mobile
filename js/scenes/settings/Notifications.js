import React, { PropTypes } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { toggleNotification } from '../../actions/settings';

import DigiHeader from '../../common/DigiHeader';
import DigiColors from '../../common/DigiColors';

import backWhite from '../../common/img/back_white.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DigiColors.primaryBackgroundColor,
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
    color: DigiColors.secondaryFontColor,
  },
  switchContainer: {
    paddingTop: 15,
    paddingRight: 30,
  },
});

const Notifications = ({ navigator, onToggleNotification, editions, notifications }) => (
  <View style={styles.container}>
    <DigiHeader
      title="Notifications"
      leftItem={{
        icon: backWhite,
        onPress: () => navigator.pop(),
      }}
    />
    <View>
      {
        editions.items.map((edition) => {
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
                  onValueChange={v => onToggleNotification(edition.name, v)}
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

Notifications.propTypes = {
  navigator: PropTypes.object.isRequired,
  onToggleNotification: PropTypes.func.isRequired,
  editions: PropTypes.object.isRequired,
  notifications: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  editions: state.editions,
  notifications: state.settings.notifications,
});

const mapDispatchToProps = dispatch => ({
  onToggleNotification: (name, value) => {
    dispatch(toggleNotification(name, value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
