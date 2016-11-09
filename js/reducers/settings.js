import * as settingsActions from '../actions/settings';

export const initialState = {
  notifications: {},
};

function notifications(state, action) {
  switch (action.type) {
    case settingsActions.TOGGLE_NOTIFICATION:
      return {
        ...state,
        [action.edition]: action.value,
      };
    default:
      return state;
  }
}

export default function settings(state = initialState, action) {
  switch (action.type) {
    case settingsActions.TOGGLE_NOTIFICATION:
      return {
        ...state,
        notifications: notifications(state.notifications, action),
      };
    default:
      return state;
  }
}
