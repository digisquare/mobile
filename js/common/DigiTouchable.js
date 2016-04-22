'use strict';

import React, {
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

function DigiTouchableIOS(props) {
  return (
    <TouchableHighlight
      accessibilityTraits="button"
      underlayColor="white"
      {...props}
    />
  );
}

const DigiTouchableIOS = Platform.OS === 'android'
  ? TouchableNativeFeedback
  : DigiTouchableIOS;

module.exports = DigiTouchableIOS;
