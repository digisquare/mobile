'use strict';

import React, { Component, View, ListView, StyleSheet, Text } from 'react-native';
import Moment from 'moment/min/moment-with-locales';

import DigiHeader from '../../common/DigiHeader';

import EventCell from './EventCell';
import EventDetails from './EventDetails';

var Events = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch('https://digisquare.net/events.json?end_at=' + Moment().format('YYYY-MM-DD') + '&edition_id=9&sort=start_at&direction=asc')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.events),
          loaded: true
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      // TODO: loader
      return null;
    }

    return (
      this.renderListView()
    );
  },

  renderListView: function(){
    return(
      <View>
        <DigiHeader
          icon={require('../../common/img/hamburger.png')}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderEventCell}
        />
      </View>
    );
  },

  renderEventCell: function(event){
    return(
      <EventCell
        onSelect={() => this.selectEvent(event)}
        event={event}
      />
    );
  },

  selectEvent: function(event){
    this.props.navigator.push({
      component: EventDetails,
      title: 'Evènement',
      passProps: {
        event: event
      }
    });
  }
});

module.exports = Events;
