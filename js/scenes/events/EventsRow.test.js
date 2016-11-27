import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import EventsRow from './EventsRow';

import events from './Events.mock';

it('renders correctly', () => {
  const tree = renderer.create(
    <EventsRow rowID="0-0" navigator={{ push: () => null }} event={events[0]} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
