import { expect } from 'chai';
import events from '../events';
import * as eventsActions from '../../actions/events.js';

describe('events reducer', () => {
  it('should return the initial state', () => {
    expect(events(undefined, {})).to.deep.equal({});
  });

  it('should handle FETCH_EVENTS_REQUEST', () => {
    expect(
      events([], {
        type: eventsActions.FETCH_EVENTS_REQUEST,
        edition: 9,
      })
    ).to.deep.equal({
      9: {
        isFetching: true,
        error: false,
        items: [],
        lastUpdated: undefined,
      },
    });
  });

  it('should handle FETCH_EVENTS_SUCCESS', () => {
    const fetchedEvents = {
      Event: {
        id: 1,
      },
    };
    const receivedAt = +new Date();
    expect(
      events([], {
        type: eventsActions.FETCH_EVENTS_SUCCESS,
        edition: 9,
        events: [fetchedEvents],
        receivedAt,
      })
    ).to.deep.equal({
      9: {
        isFetching: false,
        error: false,
        items: [fetchedEvents],
        lastUpdated: receivedAt,
      },
    });
  });

  it('should handle FETCH_EVENTS_FAILURE', () => {
    const error = 'An error message';
    const receivedAt = +new Date();
    expect(
      events([], {
        type: eventsActions.FETCH_EVENTS_FAILURE,
        edition: 9,
        error,
        receivedAt,
      })
    ).to.deep.equal({
      9: {
        isFetching: false,
        error,
        items: [],
        lastUpdated: receivedAt,
      },
    });
  });
});
