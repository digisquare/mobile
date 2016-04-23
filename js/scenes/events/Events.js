import React, { Component, PropTypes, View, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { fetchEvents } from '../../actions/events.js';

import DigiDrawerLayout from '../../common/DigiDrawerLayout';
import DigiHeader from '../../common/DigiHeader';

import EventsRow from './EventsRow';
import Event from '../event/Event';
import Editions from '../editions/Editions';

const Events = class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
    this.renderNavigationView = this.renderNavigationView.bind(this);
    this.renderEventsRow = this.renderEventsRow.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
    this.openEditionsDrawer = this.openEditionsDrawer.bind(this);
  }

  componentWillMount() {
    const { dispatch, editions: { selectedEdition } } = this.props;
    dispatch(fetchEvents(selectedEdition));
  }

  componentWillReceiveProps(nextProps) {
    const { events, editions: { selectedEdition } } = nextProps;
    const { dataSource } = this.state;
    if (!events[selectedEdition] || events[selectedEdition].isFetching) {
      this.setState({
        loaded: false,
      })
    } else {
      this.setState({
        dataSource: dataSource.cloneWithRows(events[selectedEdition].items),
        loaded: true,
      });
    }
  }

  render() {
    const { selectedEdition, items: editions } = this.props.editions;
    const edition = editions.find(edition => edition.id === selectedEdition);
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
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderEventsRow}
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
  dispatch: PropTypes.func.isRequired,
  editions: PropTypes.object.isRequired,
};

export default connect(state => state)(Events);
