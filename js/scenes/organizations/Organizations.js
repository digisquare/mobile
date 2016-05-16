import React, { Component, PropTypes } from 'react';
import { View, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Answers } from 'react-native-fabric';

import { fetchOrganizations } from '../../actions/organizations.js';

import DigiDrawerLayout from '../../common/DigiDrawerLayout';
import DigiHeader from '../../common/DigiHeader';

import OrganizationsListView from './OrganizationsListView';
import Editions from '../editions/Editions';

const Organizations = class Organizations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      refreshing: true,
      error: false,
    };
    this.renderNavigationView = this.renderNavigationView.bind(this);
    this.openEditionsDrawer = this.openEditionsDrawer.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillMount() {
    const { onFetchOrganizations, editions, editions: { selectedEdition } } = this.props;
    const editionName = editions.items.find(edition => edition.id === selectedEdition).name;
    onFetchOrganizations(selectedEdition);
    Answers.logContentView(`Organisateurs à ${editionName}`, 'organizations', 'organizations');
  }

  componentWillReceiveProps(nextProps) {
    const { onFetchOrganizations, organizations, editions: { selectedEdition } } = nextProps;
    const { dataSource } = this.state;
    if (selectedEdition !== this.props.editions.selectedEdition) {
      onFetchOrganizations(selectedEdition);
      this.setState({
        refreshing: true,
      });
    }
    if (!organizations[selectedEdition]) {
      return this.setState({
        dataSource: dataSource.cloneWithRowsAndSections({}),
      });
    }
    const { error, isFetching, items } = organizations[selectedEdition];
    if (error && !isFetching && items.length === 0) {
      return this.setState({
        refreshing: false,
        error: true,
      });
    }
    if (items) {
      return this.setState({
        dataSource: dataSource.cloneWithRows(items),
        refreshing: false,
        error: false,
      });
    }
  }

  onRefresh() {
    const { onFetchOrganizations, editions: { selectedEdition } } = this.props;
    onFetchOrganizations(selectedEdition);
    return this.setState({
      refreshing: true,
    });
  }

  render() {
    const { navigator, openMainDrawer, editions: { selectedEdition, items } } = this.props;
    const edition = items.find(edition => edition.id === selectedEdition);
    const { dataSource, refreshing, error } = this.state;
    return (
      <DigiDrawerLayout
        ref={ref => this.drawer = ref}
        drawerWidth={300}
        drawerPosition="right"
        renderNavigationView={this.renderNavigationView}
      >
        <View style={styles.container}>
          <DigiHeader
            title={edition.name}
            leftItem={{
              icon: require('../../common/img/hamburger.png'),
              onPress: openMainDrawer,
            }}
            rightItem={{
              icon: require('../../common/img/filter.png'),
              title: 'Filter',
              show: 'always',
              onPress: this.openEditionsDrawer,
            }}
          />
          <OrganizationsListView
            navigator={navigator}
            dataSource={dataSource}
            refreshing={refreshing}
            onRefresh={this.onRefresh}
            error={error}
          />
        </View>
      </DigiDrawerLayout>
    );
  }

  renderNavigationView() {
    return (
      <Editions
        closeDrawer={() => this.drawer.closeDrawer()}
      />
    );
  }

  openEditionsDrawer() {
    this.drawer && this.drawer.openDrawer();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

Organizations.propTypes = {
  navigator: PropTypes.object.isRequired,
  openMainDrawer: PropTypes.func.isRequired,
  onFetchOrganizations: PropTypes.func.isRequired,
  editions: PropTypes.object.isRequired,
  organizations: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    editions: state.editions,
    organizations: state.organizations,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrganizations: (selectedEdition) => {
      dispatch(fetchOrganizations(selectedEdition));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Organizations);
