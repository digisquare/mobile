import React, { Component, PropTypes } from 'react';
import Drawer from 'react-native-drawer'

export default class DigiDrawerLayout extends Component {

  constructor(props, context) {
    super(props, context);
    this._drawer = null;
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.onDrawerOpen = this.onDrawerOpen.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  render() {
    const { ...props } = this.props;
    return (
      <Drawer
        ref={(drawer) => this._drawer = drawer}
        type="overlay"
        openDrawerOffset={0.2}
        panOpenMask={0.2}
        panCloseMask={0.99}
        negotiatePan={true}
        captureGestures={false}
        tweenHandler={(ratio) => {
          return {
            mainOverlay: {
              opacity: 0.7 * ratio,
              backgroundColor: 'black',
            },
          }
        }}
        {...props}
        onOpen={this.onDrawerOpen}
        onClose={this.onDrawerClose}
      />
    );
  }

  componentWillUnmount() {
    this.context.removeBackButtonListener(this.handleBackButton);
    this._drawer = null;
  }

  handleBackButton() {
    this.closeDrawer();
    return true;
  }

  onDrawerOpen() {
    this.context.addBackButtonListener(this.handleBackButton);
    this.props.onDrawerOpen && this.props.onDrawerOpen();
  }

  onDrawerClose() {
    this.context.removeBackButtonListener(this.handleBackButton);
    this.props.onDrawerClose && this.props.onDrawerClose();
  }

  closeDrawer() {
    this._drawer && this._drawer.close();
  }

  openDrawer() {
    this._drawer && this._drawer.open();
  }
}

DigiDrawerLayout.contextTypes = {
  addBackButtonListener: PropTypes.func,
  removeBackButtonListener: PropTypes.func,
};

DigiDrawerLayout.propTypes = {
  drawerPosition: PropTypes.string,
  onDrawerOpen: PropTypes.func,
  onDrawerClose: PropTypes.func,
};
