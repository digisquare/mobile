import React, { Component, PropTypes } from 'react';
import { BackAndroid, Navigator, StyleSheet } from 'react-native';

import DigiDrawerLayout from './common/DigiDrawerLayout';
import DigiMainDrawer from './common/DigiMainDrawer';
import DigiColors from './common/DigiColors';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DigiColors.primaryBackgroundColor,
  },
});

export default class DigiNavigator extends Component {
  constructor(props) {
    super(props);
    this.handlers = [];
    this.handleBackButton = this.handleBackButton.bind(this);
    this.addBackButtonListener = this.addBackButtonListener.bind(this);
    this.removeBackButtonListener = this.removeBackButtonListener.bind(this);
    this.openMainDrawer = this.openMainDrawer.bind(this);
  }

  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  addBackButtonListener(listener) {
    this.handlers.push(listener);
  }

  removeBackButtonListener(listener) {
    this.handlers = this.handlers.filter(handler => handler !== listener);
  }

  handleBackButton() {
    for (let i = this.handlers.length - 1; i >= 0; i--) {
      if (this.handlers[i]()) {
        return true;
      }
    }

    const { navigator } = this.refs;

    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    return false;
  }

  openMainDrawer() {
    if (this.drawer) {
      this.drawer.openDrawer();
    }
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        style={styles.container}
        configureScene={() => Navigator.SceneConfigs.PushFromRight}
        initialRoute={this.props.initialRoute}
        renderScene={(route, navigator) => {
          if (route.component) {
            const RouteComponent = route.component;
            return (
              <DigiDrawerLayout
                ref={ref => { this.drawer = ref; }}
                content={
                  <DigiMainDrawer
                    navigator={navigator}
                  />
                }
              >
                <RouteComponent
                  navigator={navigator}
                  openMainDrawer={this.openMainDrawer}
                  {...route.passProps}
                />
              </DigiDrawerLayout>
            );
          }
          return null;
        }}
      />
    );
  }

}

DigiNavigator.childContextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};

DigiNavigator.propTypes = {
  initialRoute: PropTypes.object.isRequired,
};
