import OneSignal from 'react-native-onesignal';
import { expect } from 'chai';
import sinon from 'sinon';
import * as settingsActions from '../settings.js';

const edition = 9;

describe('settings actions', () => {
  beforeEach(() => {
    sinon.stub(OneSignal, 'sendTags');
  });

  afterEach(() => {
    OneSignal.sendTags.restore();
  });

  it('should call OneSignal to init empty notifications settings', () => {
    sinon.stub(OneSignal, 'getTags').yields();

    const fakeDispatcher = (action) => action;

    const next = settingsActions.initNotifications();

    next(fakeDispatcher);

    sinon.assert.calledOnce(OneSignal.getTags);

    OneSignal.getTags.restore();
  });

  it('should call OneSignal to init existing notifications settings', () => {
    sinon.stub(OneSignal, 'getTags').yields({
      Bordeaux: "true",
      Montpellier: "false",
    });

    const fakeDispatcher = (action) => action;

    const next = settingsActions.initNotifications();

    next(fakeDispatcher);

    sinon.assert.calledOnce(OneSignal.getTags);

    OneSignal.getTags.restore();
  });

  it('should create an action to toggle a notification', () => {
    expect(
      settingsActions.toggleNotification(edition, true)
    ).to.deep.equal({
      type: settingsActions.TOGGLE_NOTIFICATION,
      edition: edition,
      value: true,
    });
  });

  it('should call OneSignal to toggle a notification', () => {
    settingsActions.toggleNotification(edition, true);
    sinon.assert.calledOnce(OneSignal.sendTags);
  });
});
