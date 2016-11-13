import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  NavigationProvider,
  TabNavigation,
  TabNavigationItem,
  StackNavigation,
} from '@exponent/ex-navigation';

import Router from '../../router';


import DigiColors from '../../common/DigiColors';

class Drawer extends Component {
  renderIcon = (icon, selected) => {
    const color = selected ? DigiColors.primaryFontColor : DigiColors.secondaryFontColor;
    return (
      <Icon name={icon} size={20} color={color} />
    );
  }

  render() {
    return (
      <NavigationProvider router={Router}>
        <TabNavigation
          id="main"
          initialTab="events"
        >
          <TabNavigationItem
            id="events"
            title="Évènements"
            renderIcon={selected => this.renderIcon('calendar', selected)}
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
          </TabNavigationItem>
          <TabNavigationItem
            id="organizations"
            title="Organisateurs"
            renderIcon={selected => this.renderIcon('users', selected)}
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
          </TabNavigationItem>
          <TabNavigationItem
            id="settings"
            title="Paramètres"
            renderIcon={selected => this.renderIcon('cogs', selected)}
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
          </TabNavigationItem>
        </TabNavigation>
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
