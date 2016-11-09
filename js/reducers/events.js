import * as eventsActions from '../actions/events';

const initialState = {
  isFetching: false,
  items: [],
  error: false,
  lastUpdated: undefined,
};

function events(state = initialState, action) {
  switch (action.type) {
    case eventsActions.FETCH_EVENTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case eventsActions.FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        items: action.events,
        lastUpdated: action.receivedAt,
      };
    case eventsActions.FETCH_EVENTS_FAILURE:
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
    case eventsActions.FETCH_EVENTS_REQUEST:
    case eventsActions.FETCH_EVENTS_SUCCESS:
    case eventsActions.FETCH_EVENTS_FAILURE:
      return {
        ...state,
        [action.edition]: events(state[action.edition], action),
      };
    default:
      return state;
  }
};
