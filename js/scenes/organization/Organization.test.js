import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import Organization from './Organization';

import organization from './Organization.mock';

it('renders correctly', () => {
  const tree = renderer.create(
    <Organization organization={organization} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
