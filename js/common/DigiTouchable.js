import React from 'react';
import { TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native';

import DigiColors from './DigiColors';

function DigiTouchableIOS(props) {
  return (
    <TouchableHighlight
      accessibilityTraits="button"
      underlayColor={DigiColors.primaryBackgroundColor}
      {...props}
    />
  );
}

const DigiTouchable = Platform.OS === 'ios'
  ? DigiTouchableIOS
  : TouchableNativeFeedback;

export default DigiTouchable;
