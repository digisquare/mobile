import * as eventsActions from '../actions/events.js';

const initialState = {
  isFetching: false,
  items: [],
};

function events(state = initialState, action) {
  switch (action.type) {
  case eventsActions.REQUEST_EVENTS:
    return {
      ...state,
      isFetching: true,
    };
  case eventsActions.RECEIVE_EVENTS:
    return {
      ...state,
      isFetching: false,
      items: action.events,
      lastUpdated: action.receivedAt,
    };
  default:
    return state;
  }
}

export default (state = {}, action) => {
  switch (action.type) {
  case eventsActions.RECEIVE_EVENTS:
  case eventsActions.REQUEST_EVENTS:
    return {
      ...state,
      [action.edition]: events(state[action.edition], action),
    };
  default:
    return state
  }
}
