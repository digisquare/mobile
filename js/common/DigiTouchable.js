import React, { TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native';

function DigiTouchableIOS(props) {
  return (
    <TouchableHighlight
      accessibilityTraits="button"
      underlayColor="white"
      {...props}
    />
  );
}

const DigiTouchable = Platform.OS === 'ios'
  ? DigiTouchableIOS
  : TouchableNativeFeedback;

export default DigiTouchable;
