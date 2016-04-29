import React, { Component, PropTypes, ListView, RefreshControl } from 'react-native';

import DigiError from '../../common/DigiError';

import OrganizationsRow from './OrganizationsRow';
import Organization from '../organization/Organization';

export default class OrganizationsListView extends Component {
  constructor(props) {
    super(props);
    this.renderOrganizationsRow = this.renderOrganizationsRow.bind(this);
    this.selectOrganization = this.selectOrganization.bind(this);
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
        onSelect={() => this.selectOrganization(organization)}
        organization={organization}
      />
    );
  }

  selectOrganization(organization) {
    this.props.navigator.push({
      component: Organization,
      title: 'Organisateur',
      passProps: {
        organization: organization,
      },
    });
  }
}

OrganizationsListView.propTypes = {
  navigator: PropTypes.object.isRequired,
  dataSource: PropTypes.object.isRequired,
  refreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};
