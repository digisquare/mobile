import React, { Component, PropTypes, View, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

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
      loading: true,
      error: false,
    };
    this.renderNavigationView = this.renderNavigationView.bind(this);
    this.openEditionsDrawer = this.openEditionsDrawer.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillMount() {
    const { dispatch, editions: { selectedEdition } } = this.props;
    dispatch(fetchOrganizations(selectedEdition, false));
  }

  componentWillReceiveProps(nextProps) {
    const { organizations, editions: { selectedEdition } } = nextProps;
    const { dataSource } = this.state;
    if (selectedEdition !== this.props.editions.selectedEdition) {
      this.props.dispatch(fetchOrganizations(selectedEdition, false));
    }
    if (!organizations[selectedEdition]) {
      return null;
    }
    if (organizations[selectedEdition].isFetching) {
      return this.setState({
        loading: true,
      });
    }
    if (organizations[selectedEdition].error) {
      return this.setState({
        loading: false,
        error: true,
      });
    }
    if (organizations[selectedEdition].items) {
      return this.setState({
        dataSource: dataSource.cloneWithRows(organizations[selectedEdition].items),
        loading: false,
        error: false,
      });
    }
  }

  onRefresh() {
    const { dispatch, editions: { selectedEdition } } = this.props;
    dispatch(fetchOrganizations(selectedEdition));
  }

  render() {
    const { navigator, openMainDrawer, editions: { selectedEdition, items } } = this.props;
    const edition = items.find(edition => edition.id === selectedEdition);
    const { dataSource, loading, error } = this.state;
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
            refreshing={loading}
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
  dispatch: PropTypes.func.isRequired,
  editions: PropTypes.object.isRequired,
  organizations: PropTypes.object.isRequired,
};

export default connect(state => state)(Organizations);
