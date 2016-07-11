import { List } from 'immutable';

import * as editionsActions from '../actions/editions.js';

export const initialState = {
  selectedEdition: 9,
  items: new List([
    {
      id: 9,
      name: 'Bordeaux',
    },
    {
      id: 8,
      name: 'Montpellier',
    },
    {
      id: 23,
      name: 'Clermont-Ferrand',
    },
    {
      id: 4,
      name: 'Toulouse',
    },
  ]),
};

export default function edition(state = initialState, action) {
  switch (action.type) {
    case editionsActions.SELECT_EDITION:
      return {
        ...state,
        selectedEdition: action.edition,
      };
    default:
      return state;
  }
}
