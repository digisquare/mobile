import React, { PropTypes } from 'react';
import { ScrollView, Image, Text, StyleSheet } from 'react-native';

export default function DigiError({ refreshControl, image, text }) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={refreshControl}
    >
      <Image
        style={styles.tumbeast}
        source={image}
      />
      <Text>{text}</Text>
    </ScrollView>
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
    height: 200,
  },
});

DigiError.propTypes = {
  refreshControl: PropTypes.node,
  image: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

DigiError.defaultProps = {
  refreshControl: null,
};
