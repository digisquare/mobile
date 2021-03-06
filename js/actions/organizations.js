export const FETCH_ORGANIZATIONS_REQUEST = 'FETCH_ORGANIZATIONS_REQUEST';
export function fetchOrganizationsRequest(edition) {
  return {
    type: FETCH_ORGANIZATIONS_REQUEST,
    edition,
  };
}

export const FETCH_ORGANIZATIONS_SUCCESS = 'FETCH_ORGANIZATIONS_SUCCESS';
export function fetchOrganizationsSuccess(edition, json) {
  return {
    type: FETCH_ORGANIZATIONS_SUCCESS,
    edition,
    organizations: json.organizations,
    receivedAt: Date.now(),
  };
}

export const FETCH_ORGANIZATIONS_FAILURE = 'FETCH_ORGANIZATIONS_FAILURE';
export function fetchOrganizationsFailure(edition, error) {
  return {
    type: FETCH_ORGANIZATIONS_FAILURE,
    edition,
    error,
    receivedAt: Date.now(),
  };
}

export function fetchOrganizations(edition) {
  return (dispatch) => {
    dispatch(fetchOrganizationsRequest(edition));

    const url = 'https://digisquare.net/organizations.json?'
      + `&edition_id=${edition}`
      + '&sort=name'
      + '&direction=asc'
      + '&limit=100';

    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(fetchOrganizationsSuccess(edition, json)))
      .catch(error => dispatch(fetchOrganizationsFailure(edition, error)));
  };
}
