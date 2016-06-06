import React, { Component, PropTypes } from 'react';
import { View, ToolbarAndroid, StyleSheet } from 'react-native';

export default class DigiHeader extends Component {
  constructor(props) {
    super(props);
    this.handleActionSelected = this.handleActionSelected.bind(this);
  }

  render() {
    const { leftItem, rightItem, title } = this.props;
    let actions = [];
    if (rightItem) {
      const { title, icon, layout } = rightItem;
      actions.push({
        icon: layout !== 'title' ? icon : undefined,
        title: title,
        show: 'always',
      });
    }

    return (
      <View style={styles.toolbarContainer}>
        <ToolbarAndroid
          navIcon={leftItem && leftItem.icon}
          onIconClicked={leftItem && leftItem.onPress}
          title={title}
          titleColor="white"
          style={styles.toolbar}
          actions={actions}
          onActionSelected={this.handleActionSelected}
        />
      </View>
    );
  }


  handleActionSelected(position) {
    const { rightItem } = this.props;
    if (rightItem) {
      const items = [rightItem];
      const item = items[position];
      item && item.onPress && item.onPress();
    }
  }
}

const styles = StyleSheet.create({
  toolbarContainer: {
    paddingTop: 0,
  },
  toolbar: {
    height: 56,
    backgroundColor: 'black',
  },
});

DigiHeader.propTypes = {
  title: PropTypes.string.isRequired,
  leftItem: PropTypes.object,
  rightItem: PropTypes.object,
};
