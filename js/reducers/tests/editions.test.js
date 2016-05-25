import { expect } from 'chai';
import editions, { initialState } from '../editions';
import * as editionsActions from '../../actions/editions.js';

describe('editions reducer', () => {
  it('should return the initial state', () => {
    expect(editions(undefined, {})).to.deep.equal(initialState);
  });

  it('should handle SELECT_EDITION', () => {
    expect(
      editions([], {
        type: editionsActions.SELECT_EDITION,
        edition: 23,
      })
    ).to.deep.equal({
      selectedEdition: 23,
    });
  });
});
