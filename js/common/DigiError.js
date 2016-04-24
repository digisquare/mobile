import React, { View, Image, Text, StyleSheet } from 'react-native';

export default function DigiError() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tumbeast}
        source={require('./img/tumbeast.png')}
      />
      <Text>
        Oups, impossible de se connecter
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tumbeast: {
    width: 200,
    height: 92.5,
  },
});
