import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import EventsRow from './EventsRow';

import events from './Events.mock';

jest.mock('react-native-fabric', () => ({
  crash: () => {},
}));

jest.mock('@exponent/ex-navigation', () => ({
  withNavigation: () => {},
  createRouter: () => {},
}));

it('renders correctly', () => {
  const tree = renderer.create(
    <EventsRow rowID="0-0" navigator={{ push: () => null }} event={events[0]} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
