import React, { Component, PropTypes, View, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment/min/moment-with-locales';

import { fetchEvents } from '../../actions/events.js';

import DigiDrawerLayout from '../../common/DigiDrawerLayout';
import DigiHeader from '../../common/DigiHeader';

import EventsListView from './EventsListView';
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
    const { dispatch, editions: { selectedEdition } } = this.props;
    dispatch(fetchEvents(selectedEdition));
  }

  componentWillReceiveProps(nextProps) {
    const { events, editions: { selectedEdition } } = nextProps;
    const { dataSource } = this.state;
    if (selectedEdition !== this.props.editions.selectedEdition) {
      this.props.dispatch(fetchEvents(selectedEdition));
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
    const { dispatch, editions: { selectedEdition } } = this.props;
    dispatch(fetchEvents(selectedEdition));
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
              show: 'always',
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
  dispatch: PropTypes.func.isRequired,
  editions: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired,
};

export default connect(state => state)(Events);
