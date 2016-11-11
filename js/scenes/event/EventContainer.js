import React, { Component, PropTypes } from 'react';
import { RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import DigiError from '../../common/DigiError';

import Event from './Event';

import tumbeastNetwork from '../../common/img/tumbeast-network.png';

export const findEvent = (eventId, events) => (
  Object.values(events).map(edition => (
    edition.items.filter(item => (
      parseInt(item.Event.id, 10) === eventId),
    )
  )).reduce((previousValue, currentValue) => ({
    ...previousValue,
    ...currentValue[0],
  }), {})
);

class EventContainer extends Component {
  static route = {
    navigationBar: {
      title: 'Évènement',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      event: null,
    };
  }

  componentWillMount() {
    const { events, eventId } = this.props;
    const event = findEvent(eventId, events);
    if (event && event.Event) {
      this.setState({
        event,
      });
    } else {
      // TODO: fetch event
    }
  }

  componentWillReceiveProps(nextProps) {
    const { events, eventId } = nextProps;
    if (!this.state.event) {
      const event = findEvent(eventId, events);
      if (event) {
        this.setState({
          event,
        });
      }
    }
  }

  render() {
    const { navigator } = this.props;
    const { event } = this.state;

    const refreshControl = (
      <RefreshControl
        refreshing
        onRefresh={() => null}
      />
    );

    if (!event) {
      return (
        <DigiError
          refreshControl={refreshControl}
          image={tumbeastNetwork}
          text="Oups, impossible de récupérer l'évènement"
        />
      );
    }

    return (
      <Event
        navigator={navigator}
        event={event}
      />
    );
  }
}

const mapStateToProps = state => ({
  events: state.events,
});

export default connect(mapStateToProps)(EventContainer);

EventContainer.propTypes = {
  navigator: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired,
  eventId: PropTypes.number.isRequired,
};
