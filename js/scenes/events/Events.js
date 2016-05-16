import React, { Component, PropTypes } from 'react';
import { View, ListView, StyleSheet, Linking } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment/min/moment-with-locales';
import { Answers } from 'react-native-fabric';

import { fetchEvents } from '../../actions/events.js';

import DigiDrawerLayout from '../../common/DigiDrawerLayout';
import DigiHeader from '../../common/DigiHeader';

import EventsListView from './EventsListView';
import EventContainer from '../event/EventContainer';
import Editions from '../editions/Editions';

const Events = class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      }),
      refreshing: true,
      error: false,
    };
    this.renderNavigationView = this.renderNavigationView.bind(this);
    this.openEditionsDrawer = this.openEditionsDrawer.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillMount() {
    const { onFetchEvents, editions, editions: { selectedEdition } } = this.props;
    const editionName = editions.items.find(edition => edition.id === selectedEdition).name;
    onFetchEvents(selectedEdition);
    Answers.logContentView(`Évènements à ${editionName}`, 'events', 'events');
  }

  componentDidMount() {
    const { navigator } = this.props;
    Linking.getInitialURL().then(url => {
      if (!url) {
        return null;
      }
      const match = url.match(/https:\/\/digisquare.net\/events\/([0-9]+)/);
      if (match && match[1]) {
        navigator.push({
          component: EventContainer,
          passProps: {
            eventId: parseInt(match[1], 10),
          },
        });
      }
    }).catch(() => null);
  }

  componentWillReceiveProps(nextProps) {
    const { onFetchEvents, events, editions: { selectedEdition } } = nextProps;
    const { dataSource } = this.state;
    if (selectedEdition !== this.props.editions.selectedEdition) {
      onFetchEvents(selectedEdition);
      this.setState({
        refreshing: true,
      });
    }
    if (!events[selectedEdition]) {
      return this.setState({
        dataSource: dataSource.cloneWithRowsAndSections({}),
      });
    }
    const { error, isFetching, items } = events[selectedEdition];
    if (error && !isFetching && items.length === 0) {
      return this.setState({
        refreshing: false,
        error: true,
      });
    }
    if (items) {
      const dataBlob = {};
      let date;
      events[selectedEdition].items.map(item => {
        const newDate = moment(item.Event.start_at).format('YYYY-MM-DD');
        if (newDate !== date) {
          date = newDate;
          dataBlob[date] = [];
        }
        dataBlob[date].push(item);
      });
      return this.setState({
        dataSource: dataSource.cloneWithRowsAndSections(dataBlob),
        refreshing: false,
        error: false,
      });
    }
  }

  onRefresh() {
    const { onFetchEvents, editions: { selectedEdition } } = this.props;
    onFetchEvents(selectedEdition);
    return this.setState({
      refreshing: true,
    });
  }

  render() {
    const { navigator, openMainDrawer, editions: { selectedEdition, items } } = this.props;
    const edition = items.find(edition => edition.id === selectedEdition);
    const { dataSource, refreshing, error } = this.state;
    return (
      <DigiDrawerLayout
        ref={ref => this.drawer = ref}
        drawerWidth={300}
        drawerPosition="right"
        renderNavigationView={this.renderNavigationView}
      >
        <View style={styles.container}>
          <DigiHeader
            title={edition.name}
            leftItem={{
              icon: require('../../common/img/hamburger.png'),
              onPress: openMainDrawer,
            }}
            rightItem={{
              icon: require('../../common/img/filter.png'),
              title: 'Filter',
              onPress: this.openEditionsDrawer,
            }}
          />
          <EventsListView
            navigator={navigator}
            dataSource={dataSource}
            refreshing={refreshing}
            onRefresh={this.onRefresh}
            error={error}
          />
        </View>
      </DigiDrawerLayout>
    );
  }

  renderNavigationView() {
    return (
      <Editions
        closeDrawer={() => this.drawer.closeDrawer()}
      />
    );
  }

  openEditionsDrawer() {
    this.drawer && this.drawer.openDrawer();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

Events.propTypes = {
  navigator: PropTypes.object.isRequired,
  openMainDrawer: PropTypes.func.isRequired,
  onFetchEvents: PropTypes.func.isRequired,
  editions: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    editions: state.editions,
    events: state.events,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchEvents: (selectedEdition) => {
      dispatch(fetchEvents(selectedEdition));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
