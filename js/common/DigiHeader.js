import React, { PropTypes, View, ToolbarAndroid, Text, StyleSheet } from 'react-native';

export default function DigiHeader({ icon }) {
  return (
    <View style={styles.toolbarContainer}>
      <ToolbarAndroid
        navIcon={icon}
        title="Digisquare"
        titleColor="white"
        style={styles.toolbar}
      >
        <Text>content</Text>
      </ToolbarAndroid>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbarContainer: {
    paddingTop: 0,
  },
  toolbar: {
    height: 56,
    backgroundColor: 'black',
  },
});

DigiHeader.propTypes = {
  icon: PropTypes.number.isRequired,
};
