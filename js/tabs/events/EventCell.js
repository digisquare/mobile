'use strict';

import React, { Component } from 'react-native';
import Moment from 'moment/min/moment-with-locales';

import DigiTouchable from '../../common/DigiTouchable';

Moment.locale('fr');

var {
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet
} = React;

class EventCell extends Component {
  render() {
    return (
      <DigiTouchable onPress={this.props.onSelect}>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            {this.props.event.Organization[0]
              ? <Image
                style={styles.avatar}
                source={{uri: this.props.event.Organization[0].avatar}}
              />
              : null
            }
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {this.props.event.Event.name}
            </Text>
            <Text style={styles.date}>
              {this.props.event.Venue.name + ', '}
              {Moment(this.props.event.Event.start_at).fromNow()}
            </Text>
            <View style={styles.separator} />
          </View>
        </View>
      </DigiTouchable>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 0,
  },
  avatarContainer: {
    width: 50
  },
  avatar: {
    width: 40,
    height: 40,
    marginTop: 3
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize:18,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
    marginTop: 10,
  }
});

module.exports = EventCell;
