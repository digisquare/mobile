import * as organizationsActions from '../actions/organizations.js';

const initialState = {
  isFetching: false,
  items: [],
  error: false,
  lastUpdated: undefined,
};

function organizations(state = initialState, action) {
  switch (action.type) {
  case organizationsActions.FETCH_ORGANIZATIONS_REQUEST:
    return {
      ...state,
      isFetching: true,
      error: false,
    };
  case organizationsActions.FETCH_ORGANIZATIONS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      error: false,
      items: action.organizations,
      lastUpdated: action.receivedAt,
    };
  case organizationsActions.FETCH_ORGANIZATIONS_FAILURE:
    return {
      ...state,
      isFetching: false,
      error: action.error,
      lastUpdated: action.receivedAt,
    };
  default:
    return state;
  }
}

export default (state = {}, action) => {
  switch (action.type) {
  case organizationsActions.FETCH_ORGANIZATIONS_REQUEST:
  case organizationsActions.FETCH_ORGANIZATIONS_SUCCESS:
  case organizationsActions.FETCH_ORGANIZATIONS_FAILURE:
    return {
      ...state,
      [action.edition]: organizations(state[action.edition], action),
    };
  default:
    return state
  }
}
