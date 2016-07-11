import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import DigiColors from './DigiColors';

const styles = StyleSheet.create({
  header: {
    backgroundColor: DigiColors.invertedBackgroundColor,
    paddingTop: 20,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: DigiColors.invertedFontColor,
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

const DigiHeader = ({ leftItem, rightItem, title }) => (
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

DigiHeader.propTypes = {
  title: PropTypes.string.isRequired,
  leftItem: PropTypes.object,
  rightItem: PropTypes.object,
};

export default DigiHeader;
