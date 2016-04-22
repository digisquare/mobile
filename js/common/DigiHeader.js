'use strict';

import React, { Component, View, ToolbarAndroid, Text, TouchableOpacity, Icon, StyleSheet, Platform} from 'react-native';

class DigiHeaderAndroid extends Component {
  render() {
    const { icon } = this.props;
    return (
      <View style={styles.toolbarContainer}>
        <ToolbarAndroid
          navIcon={icon}
          title="Digisquare"
          titleColor="white"
          style={styles.toolbar}
        >
          <Text>content</Text>
        </ToolbarAndroid>
      </View>
    );
  }
}

class DigiHeaderIOS extends Component {
  render() {
    const title = 'title';
    const onPress = {};
    const content = 'content';
    return (
      <TouchableOpacity
        accessibilityLabel={title}
        accessibilityTraits="button"
        style={styles.toolbar}
      >
        <Text>content</Text>
      </TouchableOpacity>
    );
  }
}

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;

const styles = StyleSheet.create({
  toolbarContainer: {
    paddingTop: STATUS_BAR_HEIGHT,
  },
  toolbar: {
    height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
    backgroundColor: 'black',
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: STATUS_BAR_HEIGHT,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  leftItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerItem: {
    flex: 2,
    alignItems: 'center',
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
  itemWrapper: {
    padding: 11,
  },
  itemText: {
    letterSpacing: 1,
    fontSize: 12,
    color: 'white',
  },
});

const DigiHeader = Platform.OS === 'ios' ? DigiHeaderIOS : DigiHeaderAndroid;

module.exports = DigiHeader;
