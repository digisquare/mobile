import React, { Component, PropTypes } from 'react';
import { ListView, RefreshControl, View, Text, StyleSheet } from 'react-native';
import moment from 'moment/min/moment-with-locales';

import DigiError from '../../common/DigiError';

import EventsRow from './EventsRow';

export default class EventsListView extends Component {
  constructor(props) {
    super(props);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
    this.renderEventsRow = this.renderEventsRow.bind(this);
  }

  render() {
    const { dataSource, error, refreshing, onRefresh } = this.props;
    const refreshControl = (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    );

    if (error) {
      return (
        <DigiError
          refreshControl={refreshControl}
          image={require('../../common/img/tumbeast-network.png')}
          text="Oups, impossible de récupérer les évènements"
        />
      );
    }

    if (dataSource.getRowCount() === 0 && !refreshing) {
      return (
        <DigiError
          refreshControl={refreshControl}
          image={require('../../common/img/tumbeast-sitting.png')}
          text="Snif, aucun évènement à venir"
        />
      );
    }

    return (
      <ListView
        dataSource={dataSource}
        refreshControl={refreshControl}
        renderSectionHeader={this.renderSectionHeader}
        renderRow={this.renderEventsRow}
      />
    );
  }

  renderSectionHeader(sectionData, sectionID) {
    const date = moment(sectionID);
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          {date.format('dddd Do MMMM')}
        </Text>
      </View>
    );
  }

  renderEventsRow(event) {
    return (
      <EventsRow
        navigator={this.props.navigator}
        event={event}
      />
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor : 'grey',
    borderBottomWidth: 0.5,
    marginLeft: 10,
    marginRight: 10,
  },
  header: {
    color: 'black',
    fontWeight: '900',
    fontSize: 18,
  },
});

EventsListView.propTypes = {
  navigator: PropTypes.object.isRequired,
  dataSource: PropTypes.object.isRequired,
  refreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};
