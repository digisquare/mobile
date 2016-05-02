import React, { Component, PropTypes } from 'react';
import { ListView, RefreshControl } from 'react-native';

import DigiError from '../../common/DigiError';

import OrganizationsRow from './OrganizationsRow';

export default class OrganizationsListView extends Component {
  constructor(props) {
    super(props);
    this.renderOrganizationsRow = this.renderOrganizationsRow.bind(this);
  }

  render() {
    const { dataSource, error, refreshing, onRefresh } = this.props;
    const refreshControl = (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    );

    if (error) {
      return (
        <DigiError
          refreshControl={refreshControl}
          image={require('../../common/img/tumbeast-network.png')}
          text="Oups, impossible de récupérer les organisateurs"
        />
      );
    }

    if (dataSource.getRowCount() === 0 && !refreshing) {
      return (
        <DigiError
          refreshControl={refreshControl}
          image={require('../../common/img/tumbeast-sitting.png')}
          text="Snif, aucun organisateur dans cette ville"
        />
      );
    }

    return (
      <ListView
        dataSource={dataSource}
        refreshControl={refreshControl}
        renderRow={this.renderOrganizationsRow}
      />
    );
  }

  renderOrganizationsRow(organization) {
    return (
      <OrganizationsRow
        navigator={this.props.navigator}
        organization={organization}
      />
    );
  }

}

OrganizationsListView.propTypes = {
  navigator: PropTypes.object.isRequired,
  dataSource: PropTypes.object.isRequired,
  refreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};
