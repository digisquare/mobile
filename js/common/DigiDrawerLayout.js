import React, { Component, PropTypes } from 'react';
import Drawer from 'react-native-drawer';

import DigiColors from './DigiColors';

export default class DigiDrawerLayout extends Component {

  constructor(props, context) {
    super(props, context);
    this.drawer = null;
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.onDrawerOpen = this.onDrawerOpen.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  componentWillUnmount() {
    this.context.removeBackButtonListener(this.handleBackButton);
    this.drawer = null;
  }

  onDrawerOpen() {
    this.context.addBackButtonListener(this.handleBackButton);
    if (this.props.onDrawerOpen) {
      this.props.onDrawerOpen();
    }
  }

  onDrawerClose() {
    this.context.removeBackButtonListener(this.handleBackButton);
    if (this.props.onDrawerClose) {
      this.props.onDrawerClose();
    }
  }

  handleBackButton() {
    this.closeDrawer();
    return true;
  }

  closeDrawer() {
    if (this.drawer) {
      this.drawer.close();
    }
  }

  openDrawer() {
    if (this.drawer) {
      this.drawer.open();
    }
  }

  render() {
    const { ...props } = this.props;
    return (
      <Drawer
        ref={(drawer) => { this.drawer = drawer; }}
        type="overlay"
        openDrawerOffset={0.2}
        panOpenMask={0.2}
        panCloseMask={0.99}
        negotiatePan
        captureGestures={false}
        tweenHandler={ratio => ({
          mainOverlay: {
            opacity: 0.7 * ratio,
            backgroundColor: DigiColors.invertedBackgroundColor,
          },
        })}
        {...props}
        onOpen={this.onDrawerOpen}
        onClose={this.onDrawerClose}
      />
    );
  }
}

DigiDrawerLayout.contextTypes = {
  addBackButtonListener: PropTypes.func,
  removeBackButtonListener: PropTypes.func,
};

DigiDrawerLayout.propTypes = {
  onDrawerOpen: PropTypes.func,
  onDrawerClose: PropTypes.func,
};
