import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';

import OrganizationsRow from './OrganizationsRow';

import organizations from './Organizations.mock';

it('renders correctly', () => {
  const tree = renderer.create(
    <OrganizationsRow navigator={{ push: () => null }} organization={organizations[0]} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
