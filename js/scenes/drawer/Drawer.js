import React, { Component, PropTypes } from 'react';
import { Platform, View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  NavigationProvider,
  DrawerNavigation,
  DrawerNavigationItem,
  StackNavigation,
} from '@exponent/ex-navigation';

import Router from '../../router';


import DigiColors from '../../common/DigiColors';

const styles = StyleSheet.create({
  logoContainer: {
    height: Platform.OS === 'ios' ? 64 : 55,
    backgroundColor: DigiColors.invertedBackgroundColor,
    justifyContent: 'center',
    paddingLeft: 25,
  },
  logo: {
    color: DigiColors.invertedFontColor,
    fontWeight: 'bold',
    fontSize: 20,
  },
  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  item: {
    fontSize: 18,
    fontWeight: '900',
    color: DigiColors.secondaryFontColor,
  },
  icon: {
    width: 40,
  },
});

class Drawer extends Component {
  renderTitle = (icon, title) => (
    <View style={styles.itemContainer}>
      <Icon name={icon} size={20} color={DigiColors.primaryFontColor} style={styles.icon} />
      <Text style={styles.item}>
        {title}
      </Text>
    </View>
  );

  render() {
    return (
      <NavigationProvider router={Router}>
        <DrawerNavigation
          id="main"
          initialItem="events"
          drawerWidth={300}
          renderHeader={() => (
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>Digisquare</Text>
            </View>
          )}
        >
          <DrawerNavigationItem
            id="events"
            renderTitle={() => this.renderTitle('calendar', 'Évènements')}
          >
            <StackNavigation
              id="events"
              initialRoute={Router.getRoute('events')}
              defaultRouteConfig={{
                navigationBar: {
                  backgroundColor: DigiColors.invertedBackgroundColor,
                  tintColor: DigiColors.invertedFontColor,
                },
              }}
            />
          </DrawerNavigationItem>
          <DrawerNavigationItem
            id="organizations"
            renderTitle={() => this.renderTitle('users', 'Organisateurs')}
          >
            <StackNavigation
              id="organizations"
              initialRoute={Router.getRoute('organizations')}
              defaultRouteConfig={{
                navigationBar: {
                  backgroundColor: DigiColors.invertedBackgroundColor,
                  tintColor: DigiColors.invertedFontColor,
                },
              }}
            />
          </DrawerNavigationItem>
          <DrawerNavigationItem
            id="settings"
            renderTitle={() => this.renderTitle('cogs', 'Paramètres')}
          >
            <StackNavigation
              id="settings"
              initialRoute={Router.getRoute('settings')}
              defaultRouteConfig={{
                navigationBar: {
                  backgroundColor: DigiColors.invertedBackgroundColor,
                  tintColor: DigiColors.invertedFontColor,
                  title: 'Paramètres',
                },
              }}
            />
          </DrawerNavigationItem>
        </DrawerNavigation>
      </NavigationProvider>
    );
  }
}

const mapStateToProps = state => ({
  editions: state.editions,
});

export default connect(mapStateToProps)(Drawer);

Drawer.propTypes = {
  editions: PropTypes.object.isRequired,
};
