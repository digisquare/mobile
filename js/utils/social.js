import React from 'react';
import { View, Linking } from 'react-native';
import { Button } from 'react-native-vector-icons/FontAwesome';

const colors = {
  facebook: '#3b5998',
  twitter: '#55acee',
}

const urls = {
  facebook: 'https://www.facebook.com/',
  twitter: 'https://twitter.com/',
}

export const socialBadge = (network, contacts) => {
	if (!contacts[network]) {
    return <View />;
  }

  const username = contacts[network];

  return (
    <View style={{marginRight: 10}}>
      <Button
        name={network}
        padding={2}
        paddingLeft={8}
        paddingRight={8}
        size={12}
        backgroundColor={colors[network]}
        onPress={() => Linking.openURL(urls[network] + username)}
      >
        {username}
      </Button>
    </View>
  );
}