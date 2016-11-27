import React, { Component, PropTypes } from 'react';
import { ListView, Linking } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment/min/moment-with-locales';
import { Answers } from 'react-native-fabric';

import Router from '../../router';

import { fetchEvents } from '../../actions/events';

import Events from './Events';

class EventsContainer extends Component {
  static route = {
    navigationBar: {
      title({ title }) {
        return title || 'Bordeaux';
      },
    },
  }

  constructor(props) {
    super(props);
    const { editions: { selectedEdition }, events } = props;
    const items = events[selectedEdition]
      && events[selectedEdition].items
      && events[selectedEdition].items.length > 0;
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      }),
      refreshing: !items,
      error: false,
    };
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
    Linking.getInitialURL().then((url) => {
      if (!url) {
        return null;
      }
      const match = url.match(/https:\/\/digisquare.net\/events\/([0-9]+)/);
      if (match && match[1]) {
        navigator.push(Router.getRoute('event', { eventId: parseInt(match[1], 10) }));
      }
      return null;
    }).catch(() => null);
  }

  componentWillReceiveProps(nextProps) {
    const { onFetchEvents, events, editions } = nextProps;
    const { selectedEdition } = editions;
    const { dataSource, refreshing } = this.state;
    if (selectedEdition !== this.props.editions.selectedEdition) {
      const edition = editions.items.find(e => e.id === selectedEdition);
      this.props.navigator.updateCurrentRouteParams({
        title: edition.name,
      });
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
    if (refreshing && !isFetching) {
      this.setState({
        refreshing: false,
      });
    }
    if (items) {
      const dataBlob = {};
      let date;
      let sectionID = -1;
      events[selectedEdition].items.map((item) => {
        const newDate = moment(item.Event.start_at).format('YYYY-MM-DD');
        if (newDate !== date) {
          date = newDate;
          sectionID += 1;
          dataBlob[sectionID] = [];
        }
        dataBlob[sectionID].push(item);
        return null;
      });
      return this.setState({
        dataSource: dataSource.cloneWithRowsAndSections(dataBlob),
        error: false,
      });
    }
    return null;
  }

  onRefresh() {
    const { onFetchEvents, editions: { selectedEdition } } = this.props;
    onFetchEvents(selectedEdition);
    return this.setState({
      refreshing: true,
    });
  }

  render() {
    const { navigator } = this.props;
    const { dataSource, refreshing, error } = this.state;
    return (
      <Events
        navigator={navigator}
        dataSource={dataSource}
        refreshing={refreshing}
        onRefresh={this.onRefresh}
        error={error}
      />
    );
  }
}

const mapStateToProps = state => ({
  editions: state.editions,
  events: state.events,
});

const mapDispatchToProps = dispatch => ({
  onFetchEvents: (selectedEdition) => {
    dispatch(fetchEvents(selectedEdition));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer);

EventsContainer.propTypes = {
  navigator: PropTypes.object.isRequired,
  onFetchEvents: PropTypes.func.isRequired,
  editions: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired,
};
