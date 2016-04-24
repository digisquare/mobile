import React, { Component, PropTypes, View, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

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
      }),
      loading: true,
      error: false,
    };
    this.renderNavigationView = this.renderNavigationView.bind(this);
    this.openEditionsDrawer = this.openEditionsDrawer.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillMount() {
    const { dispatch, editions: { selectedEdition } } = this.props;
    dispatch(fetchEvents(selectedEdition, false));
  }

  componentWillReceiveProps(nextProps) {
    const { events, editions: { selectedEdition } } = nextProps;
    const { dataSource } = this.state;
    if (!events[selectedEdition]) {
      return null;
    }
    if (events[selectedEdition].isFetching) {
      return this.setState({
        loading: true,
      });
    }
    if (events[selectedEdition].error) {
      return this.setState({
        loading: false,
        error: true,
      });
    }
    if (events[selectedEdition].items) {
      return this.setState({
        dataSource: dataSource.cloneWithRows(events[selectedEdition].items),
        loading: false,
        error: false,
      });
    }
  }

  onRefresh() {
    const { dispatch, editions: { selectedEdition } } = this.props;
    dispatch(fetchEvents(selectedEdition));
  }

  render() {
    const { navigator, editions: { selectedEdition, items } } = this.props;
    const edition = items.find(edition => edition.id === selectedEdition);
    const { dataSource, loading, error } = this.state;
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
              onPress: () => null,
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
            refreshing={loading}
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
  dispatch: PropTypes.func.isRequired,
  editions: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired,
};

export default connect(state => state)(Events);
