import { expect } from 'chai';
import organizations from '../organizations';
import * as organizationsActions from '../../actions/organizations.js';

describe('organizations reducer', () => {
  it('should return the initial state', () => {
    expect(organizations(undefined, {})).to.deep.equal({});
  });

  it('should handle FETCH_ORGANIZATIONS_REQUEST', () => {
    expect(
      organizations([], {
        type: organizationsActions.FETCH_ORGANIZATIONS_REQUEST,
        edition: 9,
      })
    ).to.deep.equal({
      9: {
        isFetching: true,
        error: false,
        items: [],
        lastUpdated: undefined,
      },
    });
  });

  it('should handle FETCH_ORGANIZATIONS_SUCCESS', () => {
    const fetchedOrganizations = {
      Organization: {
        id: 1,
      },
    };
    const receivedAt = +new Date();
    expect(
      organizations([], {
        type: organizationsActions.FETCH_ORGANIZATIONS_SUCCESS,
        edition: 9,
        organizations: [fetchedOrganizations],
        receivedAt,
      })
    ).to.deep.equal({
      9: {
        isFetching: false,
        error: false,
        items: [fetchedOrganizations],
        lastUpdated: receivedAt,
      },
    });
  });

  it('should handle FETCH_ORGANIZATIONS_FAILURE', () => {
    const error = 'An error message';
    const receivedAt = +new Date();
    expect(
      organizations([], {
        type: organizationsActions.FETCH_ORGANIZATIONS_FAILURE,
        edition: 9,
        error,
        receivedAt,
      })
    ).to.deep.equal({
      9: {
        isFetching: false,
        error,
        items: [],
        lastUpdated: receivedAt,
      },
    });
  });
});
