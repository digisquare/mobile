import React, { Component, PropTypes } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { toggleNotification } from '../../actions/settings';

import DigiColors from '../../common/DigiColors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DigiColors.primaryBackgroundColor,
  },
  editionContainer: {
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

class Notifications extends Component {
  static route = {
    navigationBar: {
      title: 'Notifications',
    },
  }

  render() {
    const { onToggleNotification, editions, notifications } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.container}>
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
  }
}

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

Notifications.propTypes = {
  onToggleNotification: PropTypes.func.isRequired,
  editions: PropTypes.object.isRequired,
  notifications: PropTypes.object.isRequired,
};
