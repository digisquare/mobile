'use strict';

import React, { Component, View, StatusBar, StyleSheet } from 'react-native';

import DigiNavigator from './DigiNavigator';
import EventsListView from './tabs/events/EventsListView';

class DigiApp extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="black"
          barStyle="light-content"
        />
        <DigiNavigator
          initialRoute={{
            name: 'Digisquare',
            component: EventsListView
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = DigiApp;
