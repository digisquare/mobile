import React, { Component, PropTypes } from 'react';
import { View, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Answers } from 'react-native-fabric';

import { fetchOrganizations } from '../../actions/organizations';

import OrganizationsListView from './OrganizationsListView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class OrganizationsContainer extends Component {
  static route = {
    navigationBar: {
      title({ title }) {
        return title || 'Bordeaux';
      },
    },
  }

  constructor(props) {
    super(props);
    const { editions: { selectedEdition }, organizations } = props;
    const items = organizations[selectedEdition]
      && organizations[selectedEdition].items
      && organizations[selectedEdition].items.length > 0;
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      refreshing: !items,
      error: false,
    };
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillMount() {
    const { onFetchOrganizations, editions, editions: { selectedEdition } } = this.props;
    const editionName = editions.items.find(edition => edition.id === selectedEdition).name;
    onFetchOrganizations(selectedEdition);
    Answers.logContentView(`Organisateurs à ${editionName}`, 'organizations', 'organizations');
  }

  componentWillReceiveProps(nextProps) {
    const { onFetchOrganizations, organizations, editions } = nextProps;
    const { selectedEdition } = editions;
    const { dataSource, refreshing } = this.state;
    if (selectedEdition !== this.props.editions.selectedEdition) {
      const edition = editions.items.find(e => e.id === selectedEdition);
      this.props.navigator.updateCurrentRouteParams({
        title: edition.name,
      });
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
    if (refreshing && !isFetching) {
      this.setState({
        refreshing: false,
      });
    }
    if (items) {
      return this.setState({
        dataSource: dataSource.cloneWithRows(items),
        error: false,
      });
    }
    return null;
  }

  onRefresh() {
    const { onFetchOrganizations, editions: { selectedEdition } } = this.props;
    onFetchOrganizations(selectedEdition);
    return this.setState({
      refreshing: true,
    });
  }

  render() {
    const { navigator } = this.props;
    const { dataSource, refreshing, error } = this.state;
    return (
      <View style={styles.container}>
        <OrganizationsListView
          navigator={navigator}
          dataSource={dataSource}
          refreshing={refreshing}
          onRefresh={this.onRefresh}
          error={error}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  editions: state.editions,
  organizations: state.organizations,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrganizations: (selectedEdition) => {
    dispatch(fetchOrganizations(selectedEdition));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsContainer);

OrganizationsContainer.propTypes = {
  navigator: PropTypes.object.isRequired,
  onFetchOrganizations: PropTypes.func.isRequired,
  editions: PropTypes.object.isRequired,
  organizations: PropTypes.object.isRequired,
};
