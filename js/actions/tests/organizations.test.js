import fetchMock from 'fetch-mock';
import { expect } from 'chai';
import * as organizationsActions from '../organizations.js';

const edition = 9;
const receivedAt = Date.now();
const organizationsUrlRegex = /organizations\.json/;
const json = {
  organizations: ['foo', 'bar'],
};
const error = new Error('some network error');

describe('organizations actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should create an action to request organizations', () => {
    const lastCalledAction = organizationsActions.fetchOrganizationsRequest(edition);
    expect(lastCalledAction.type).to.equal('FETCH_ORGANIZATIONS_REQUEST');
  });

  it('should create an action on fetch organizations success', () => {
    const lastCalledAction = organizationsActions.fetchOrganizationsSuccess(
      edition,
      json,
      receivedAt
    );
    expect(lastCalledAction.type).to.equal('FETCH_ORGANIZATIONS_SUCCESS');
    expect(lastCalledAction.organizations).to.deep.equal(json.organizations);
  });

  it('should create an action on fetch organizations error', () => {
    const lastCalledAction = organizationsActions.fetchOrganizationsFailure(
      edition,
      error,
      receivedAt
    );
    expect(lastCalledAction.type).to.equal('FETCH_ORGANIZATIONS_FAILURE');
    expect(lastCalledAction.error).to.equal(error);
  });

  it('should dispatch FETCH_ORGANIZATIONS_REQUEST action on organizations fetch', () => {
    let lastCalledAction = null;
    const fakeDispatcher = (action) => {
      lastCalledAction = action;
    };

    fetchMock.mock(organizationsUrlRegex, 200);

    const next = organizationsActions.fetchOrganizations(edition);

    next(fakeDispatcher);

    expect(lastCalledAction.type).to.equal('FETCH_ORGANIZATIONS_REQUEST');
  });

  it('should fetch organizations', () => {
    const fakeDispatcher = (action) => action;

    fetchMock.mock(organizationsUrlRegex, 200);

    const next = organizationsActions.fetchOrganizations(edition);

    next(fakeDispatcher);

    expect(fetchMock.called(organizationsUrlRegex)).to.equal(true);
  });

  it('should dispatch FETCH_ORGANIZATIONS_SUCCESS on success', (done) => {
    let lastCalledAction = null;
    const fakeDispatcher = (action) => {
      lastCalledAction = action;
    };

    fetchMock.mock(organizationsUrlRegex, 'GET', json);

    const next = organizationsActions.fetchOrganizations(edition);

    next(fakeDispatcher).then(() => {
      try {
        expect(lastCalledAction.type).to.equal('FETCH_ORGANIZATIONS_SUCCESS');
        expect(lastCalledAction.organizations).to.deep.equal(json.organizations);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  it('should dispatch FETCH_ORGANIZATIONS_FAILURE on error', (done) => {
    let lastCalledAction = null;
    const fakeDispatcher = (action) => {
      lastCalledAction = action;
    };

    fetchMock.mock(organizationsUrlRegex, { throws: error });

    const next = organizationsActions.fetchOrganizations(edition);

    next(fakeDispatcher).then(() => {
      try {
        expect(lastCalledAction.type).to.equal('FETCH_ORGANIZATIONS_FAILURE');
        expect(lastCalledAction.error).to.equal(error);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
