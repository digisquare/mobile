import React, { PropTypes, View, Text, StyleSheet } from 'react-native';

import DigiHeader from './DigiHeader';
import DigiTouchable from './DigiTouchable';

import Events from '../scenes/events/Events';
import Organizations from '../scenes/organizations/Organizations';

const DigiMainDrawer = ({ navigator, closeDrawer }) => {
  return (
    <View>
      <DigiHeader
        title="Digisquare"
      />
      <DigiTouchable
        key="1"
        onPress={() => {
          navigator.replace({
            component: Events,
          });
          closeDrawer();
        }}
      >
        <View style={styles.editionContainer}>
          <Text style={styles.edition}>
            Évènements
          </Text>
        </View>
      </DigiTouchable>
      <DigiTouchable
        key="2"
        onPress={() => {
          navigator.replace({
            component: Organizations,
          });
          closeDrawer();
        }}
      >
        <View style={styles.editionContainer}>
          <Text style={styles.edition}>
            Organisateurs
          </Text>
        </View>
      </DigiTouchable>
    </View>
  );
}

const styles = StyleSheet.create({
  editionContainer: {
    height: 56,
    justifyContent: 'center',
    paddingLeft: 30,
  },
  edition: {
    fontSize: 18,
    fontWeight: '500',
  },
});

DigiMainDrawer.propTypes = {
  navigator: PropTypes.object.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};

export default DigiMainDrawer;
