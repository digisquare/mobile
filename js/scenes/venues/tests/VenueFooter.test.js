import React from 'react';
import { View, Linking, TouchableOpacity } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import VenueFooter from '../VenueFooter';

const venue = {
  id: '13',
  edition_id: '9',
  name: 'Darwin',
  address: '87 Quai Des Queyries',
  zipcode: '33100',
  city: 'Bordeaux',
  country_code: 'FR',
  latitude: '44.849751',
  longitude: '-0.561172',
  event_count: '10',
  created: '2015-01-24 18:05:09',
  modified: '2015-01-24 20:48:16',
  oneliner: 'Darwin, 87 Quai Des Queyries, 33100 Bordeaux, FR',
};

describe('<VenueFooter />', () => {
  it('should render', () => {
    const component = shallow(
      <VenueFooter
        venue={venue}
      />,
    );

    expect(component.find(TouchableOpacity)).to.have.lengthOf(1);
    expect(component.find(View)).to.have.lengthOf(2);
  });

  it('should open map on click', () => {
    const onComponentPress = sinon.spy(Linking, 'openURL');

    const component = shallow(
      <VenueFooter
        venue={venue}
      />,
    );

    component.find(TouchableOpacity).simulate('press');
    expect(onComponentPress.calledOnce).to.equal(true);

    onComponentPress.restore();
  });
});
