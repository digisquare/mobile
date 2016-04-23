import React, { Component, View, StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import store from './reducers';

import DigiNavigator from './DigiNavigator';
import Events from './scenes/events/Events';

export default class DigiApp extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar
            backgroundColor="black"
            barStyle="light-content"
          />
          <DigiNavigator
            initialRoute={{
              name: 'Digisquare',
              component: Events,
            }}
          />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
