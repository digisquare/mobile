import OneSignal from 'react-native-onesignal';

export const INIT_NOTIFICATIONS = 'INIT_NOTIFICATIONS';
export function initNotifications() {
  return dispatch => {
    OneSignal.getTags(receivedTags => {
      if (receivedTags) {
        Object.keys(receivedTags).map(tag => {
          const value = receivedTags[tag] === "true" ? true : false;
          dispatch(toggleNotification(tag, value));
        });
      }
    });
  }
}

export const TOGGLE_NOTIFICATION = 'TOGGLE_NOTIFICATION';
export function toggleNotification(edition, value) {
  OneSignal.sendTags({[edition]: value});
  return {
    type: TOGGLE_NOTIFICATION,
    edition,
    value,
  };
}
