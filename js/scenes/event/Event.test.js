import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import Event from './Event';

import events from '../events/Events.mock';

it('renders correctly', () => {
  const tree = renderer.create(
    <Event navigator={{ push: () => null }} event={events[0]} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
