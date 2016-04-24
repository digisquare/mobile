import React, { Component, PropTypes, ListView, RefreshControl } from 'react-native';

import DigiError from '../../common/DigiError';

import EventsRow from './EventsRow';
import Event from '../event/Event';

export default class EventsListView extends Component {
  constructor(props) {
    super(props);
    this.renderEventsRow = this.renderEventsRow.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
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
        renderRow={this.renderEventsRow}
        refreshControl={refreshControl}
      />
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

EventsListView.propTypes = {
  navigator: PropTypes.object.isRequired,
  dataSource: PropTypes.object.isRequired,
  refreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};
