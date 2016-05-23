import { expect } from 'chai'
import settings, { initialState } from '../settings'
import * as settingsActions from '../../actions/settings.js';

describe('settings reducer', () => {
  it('should return the initial state', () => {
    expect(settings(undefined, {})).to.deep.equal(initialState);
  });

  it('should handle TOGGLE_NOTIFICATION', () => {
    expect(
      settings([], {
        type: settingsActions.TOGGLE_NOTIFICATION,
        edition: 9,
        value: true,
      })
    ).to.deep.equal(
      {
        notifications: {
          9: true,
        },
      },
    )
  });
});
