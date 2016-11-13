import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, Platform } from 'react-native';
import { Provider } from 'react-redux';

import store from './reducers';

import { initNotifications } from './actions/settings';

import DigiColors from './common/DigiColors';

import Tabs from './scenes/tabs/Tabs';
import Drawer from './scenes/drawer/Drawer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DigiColors.primaryBackgroundColor,
  },
});

export default class DigiApp extends Component {
  constructor() {
    super();
    store.dispatch(initNotifications());
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar
            backgroundColor={DigiColors.invertedBackgroundColor}
            barStyle="light-content"
          />
          {
            Platform.OS === 'ios' ? <Tabs /> : <Drawer />
          }
        </View>
      </Provider>
    );
  }
}
