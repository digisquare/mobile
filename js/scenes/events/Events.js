import React, { Component, PropTypes, View, Text, ListView, StyleSheet } from 'react-native';
import moment from 'moment/min/moment-with-locales';

import DigiDrawerLayout from '../../common/DigiDrawerLayout';
import DigiHeader from '../../common/DigiHeader';

import EventsRow from './EventsRow';
import Event from '../event/Event';

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
    this.renderEventsRow = this.renderEventsRow.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
    this.openCityDrawer = this.openCityDrawer.bind(this);
  }

  componentWillMount() {
    const url = 'https://digisquare.net/events.json?'
      + 'end_at=' + moment().format('YYYY-MM-DD')
      + '&edition_id=9'
      + '&sort=start_at'
      + '&direction=asc';

    fetch(url)
      .then(response => response.json())
      .then(responseData => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.events),
            loaded: true,
          });
        })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      // TODO: loader
      return null;
    }

    return (
      <DigiDrawerLayout
        ref={(drawer) => this._drawer = drawer}
        drawerWidth={300}
        drawerPosition="right"
        renderNavigationView={this.renderNavigationView}
      >
        <View style={styles.container}>
          <DigiHeader
            title="Bordeaux"
            leftItem={{
              icon: require('../../common/img/hamburger.png'),
              onPress: () => null,
            }}
            rightItem={{
              icon: require('../../common/img/filter.png'),
              title: 'Filter',
              show: 'always',
              onPress: this.openCityDrawer,
            }}
          />
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderEventsRow}
          />
        </View>
      </DigiDrawerLayout>
    );
  }

  openCityDrawer() {
    this._drawer && this._drawer.openDrawer();
  }

  renderNavigationView() {
    return (
      <View>
        <Text>Plop</Text>
      </View>
    );
  }

  renderEventsRow(event) {
    return (
      <EventsRow
        onSelect={() => this.selectEvent(event)}
        event={event}
      />
    );
  }

  selectEvent(event) {
    this.props.navigator.push({
      component: Event,
      title: 'Evènement',
      passProps: {
        event: event,
      },
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

Events.propTypes = {
  navigator: PropTypes.object.isRequired,
};
