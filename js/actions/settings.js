import OneSignal from 'react-native-onesignal';

export const TOGGLE_NOTIFICATION = 'TOGGLE_NOTIFICATION';
export function toggleNotification(edition, value) {
  OneSignal.sendTags({ [edition]: value });
  return {
    type: TOGGLE_NOTIFICATION,
    edition,
    value,
  };
}

export const INIT_NOTIFICATIONS = 'INIT_NOTIFICATIONS';
export function initNotifications() {
  return (dispatch) => {
    OneSignal.getTags((receivedTags) => {
      if (receivedTags) {
        Object.keys(receivedTags).map(tag => (
          dispatch(toggleNotification(tag, receivedTags[tag] === 'true'))
        ));
      }
    });
  };
}
