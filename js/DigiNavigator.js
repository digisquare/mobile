import React, { Component, PropTypes, BackAndroid, Navigator, StyleSheet } from 'react-native';

export default class DigiNavigator extends Component {
  constructor(props) {
    super(props);
    this._handlers = [];
    this.handleBackButton = this.handleBackButton.bind(this);
    this.addBackButtonListener = this.addBackButtonListener.bind(this);
    this.removeBackButtonListener = this.removeBackButtonListener.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    };
  }

  addBackButtonListener(listener) {
    this._handlers.push(listener);
  }

  removeBackButtonListener(listener) {
    this._handlers = this._handlers.filter(handler => handler !== listener);
  }

  handleBackButton() {
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
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

  render() {
    return (
      <Navigator
        ref="navigator"
        style={styles.container}
        configureScene={() => Navigator.SceneConfigs.PushFromRight}
        initialRoute={this.props.initialRoute}
        renderScene={(route, navigator) => {
          // count the number of func calls
          if (route.component) {
            return React.createElement(
              route.component,
              {
                navigator,
                ...route.passProps,
              }
            );
          }
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

DigiNavigator.childContextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};

DigiNavigator.propTypes = {
  initialRoute: PropTypes.object.isRequired,
};
