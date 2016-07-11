import React, { Component, PropTypes } from 'react';
import { View, ToolbarAndroid, StyleSheet } from 'react-native';

import DigiColors from './DigiColors';

const styles = StyleSheet.create({
  toolbarContainer: {
    paddingTop: 0,
  },
  toolbar: {
    height: 56,
    backgroundColor: DigiColors.invertedBackgroundColor,
  },
});

export default class DigiHeader extends Component {
  constructor(props) {
    super(props);
    this.handleActionSelected = this.handleActionSelected.bind(this);
  }

  handleActionSelected(position) {
    const { rightItem } = this.props;
    if (rightItem) {
      const items = [rightItem];
      const item = items[position];
      if (item && item.onPress) {
        item.onPress();
      }
    }
  }

  render() {
    const { leftItem, rightItem, title } = this.props;
    let actions = [];
    if (rightItem) {
      const { title: rightTitle, icon, layout } = rightItem;
      actions.push({
        icon: layout !== 'title' ? icon : undefined,
        title: rightTitle,
        show: 'always',
      });
    }

    return (
      <View style={styles.toolbarContainer}>
        <ToolbarAndroid
          navIcon={leftItem && leftItem.icon}
          onIconClicked={leftItem && leftItem.onPress}
          title={title}
          titleColor={DigiColors.invertedFontColor}
          style={styles.toolbar}
          actions={actions}
          onActionSelected={this.handleActionSelected}
        />
      </View>
    );
  }
}

DigiHeader.propTypes = {
  title: PropTypes.string.isRequired,
  leftItem: PropTypes.object,
  rightItem: PropTypes.object,
};
