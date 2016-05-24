import { expect } from 'chai';
import * as editionsActions from '../editions.js';

describe('editions actions', () => {
  it('should create an action to select an edition', () => {
    const edition = 9;
    expect(
      editionsActions.selectEdition(edition)
    ).to.deep.equal({
      type: editionsActions.SELECT_EDITION,
      edition,
    });
  });
});
