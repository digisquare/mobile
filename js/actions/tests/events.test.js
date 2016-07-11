import fetchMock from 'fetch-mock';
import { expect } from 'chai';
import * as eventsActions from '../events.js';

const edition = 9;
const receivedAt = Date.now();
const eventsUrlRegex = /events\.json/;
const json = {
  events: ['foo', 'bar'],
};
const error = new Error('some network error');

describe('events actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should create an action to request events', () => {
    const lastCalledAction = eventsActions.fetchEventsRequest(edition);
    expect(lastCalledAction.type).to.equal('FETCH_EVENTS_REQUEST');
  });

  it('should create an action on fetch events success', () => {
    const lastCalledAction = eventsActions.fetchEventsSuccess(edition, json, receivedAt);
    expect(lastCalledAction.type).to.equal('FETCH_EVENTS_SUCCESS');
    expect(lastCalledAction.events).to.deep.equal(json.events);
  });

  it('should create an action on fetch events error', () => {
    const lastCalledAction = eventsActions.fetchEventsFailure(edition, error, receivedAt);
    expect(lastCalledAction.type).to.equal('FETCH_EVENTS_FAILURE');
    expect(lastCalledAction.error).to.equal(error);
  });

  it('should dispatch FETCH_EVENTS_REQUEST action on events fetch', () => {
    let lastCalledAction = null;
    const fakeDispatcher = (action) => {
      lastCalledAction = action;
    };

    fetchMock.mock(eventsUrlRegex, 200);

    const next = eventsActions.fetchEvents(edition);

    next(fakeDispatcher);

    expect(lastCalledAction.type).to.equal('FETCH_EVENTS_REQUEST');
  });

  it('should fetch events', () => {
    const fakeDispatcher = (action) => action;

    fetchMock.mock(eventsUrlRegex, 200);

    const next = eventsActions.fetchEvents(edition);

    next(fakeDispatcher);

    expect(fetchMock.called(eventsUrlRegex)).to.equal(true);
  });

  it('should dispatch FETCH_EVENTS_SUCCESS on success', (done) => {
    let lastCalledAction = null;
    const fakeDispatcher = (action) => {
      lastCalledAction = action;
    };

    fetchMock.mock(eventsUrlRegex, 'GET', json);

    const next = eventsActions.fetchEvents(edition);

    next(fakeDispatcher).then(() => {
      try {
        expect(lastCalledAction.type).to.equal('FETCH_EVENTS_SUCCESS');
        expect(lastCalledAction.events).to.deep.equal(json.events);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  it('should dispatch FETCH_EVENTS_FAILURE on error', (done) => {
    let lastCalledAction = null;
    const fakeDispatcher = (action) => {
      lastCalledAction = action;
    };

    fetchMock.mock(eventsUrlRegex, { throws: error });

    const next = eventsActions.fetchEvents(edition);

    next(fakeDispatcher).then(() => {
      try {
        expect(lastCalledAction.type).to.equal('FETCH_EVENTS_FAILURE');
        expect(lastCalledAction.error).to.equal(error);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
