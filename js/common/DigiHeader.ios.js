import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default class DigiHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { leftItem, rightItem, title } = this.props;

    return (
      <View style={styles.header}>
        <View style={styles.leftItem}>
          {
            leftItem ? (
              <TouchableOpacity
                onPress={leftItem.onPress}
                style={styles.itemWrapper}
              >
                <Image source={leftItem.icon} />
              </TouchableOpacity>
            ) : null
          }
        </View>
        <View style={styles.centerItem}>
          <Text style={styles.titleText}>
            {title}
          </Text>
        </View>
        <View style={styles.rightItem}>
          {
            rightItem ? (
              <TouchableOpacity
                onPress={rightItem.onPress}
                style={styles.itemWrapper}
              >
                <Image source={rightItem.icon} />
              </TouchableOpacity>
            ) : null
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    paddingTop: 20,
    height: 64,
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
});

DigiHeader.propTypes = {
  title: PropTypes.string.isRequired,
  leftItem: PropTypes.object,
  rightItem: PropTypes.object,
};
