import OneSignal from 'react-native-onesignal';
import { expect } from 'chai';
import * as settingsActions from '../settings';

const edition = 9;

jest.mock('react-native-onesignal');

describe('settings actions', () => {
  afterEach(() => {
    OneSignal.sendTags.mockReset();
    OneSignal.getTags.mockReset();
  });

  it('should call OneSignal to init empty notifications settings', () => {
    const fakeDispatcher = action => action;

    const next = settingsActions.initNotifications();

    next(fakeDispatcher);

    expect(OneSignal.getTags.mock.calls).to.have.lengthOf(1);
  });

  it('should call OneSignal to init existing notifications settings', () => {
    jest.mock('react-native-onesignal', () => ({
      getTags: () => ({
        Bordeaux: 'true',
        Montpellier: 'false',
      }),
    }));

    const fakeDispatcher = action => action;

    const next = settingsActions.initNotifications();

    next(fakeDispatcher);

    expect(OneSignal.getTags.mock.calls).to.have.lengthOf(1);
  });

  it('should create an action to toggle a notification', () => {
    expect(
      settingsActions.toggleNotification(edition, true),
    ).to.deep.equal({
      type: settingsActions.TOGGLE_NOTIFICATION,
      edition,
      value: true,
    });
  });

  it('should call OneSignal to toggle a notification', () => {
    settingsActions.toggleNotification(edition, true);
    expect(OneSignal.sendTags.mock.calls).to.have.lengthOf(1);
  });
});
