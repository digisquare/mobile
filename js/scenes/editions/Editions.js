import React, { PropTypes, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'

import { selectEdition } from '../../actions/editions.js';

import DigiHeader from '../../common/DigiHeader';
import DigiTouchable from '../../common/DigiTouchable';

const Editions = ({ editions, dispatch, closeDrawer }) => {
  return (
    <View>
      <DigiHeader
        title="Editions"
      />
      {
        editions.items.map(edition => {
          return (
            <DigiTouchable
              key={edition.id}
              onPress={() => {
                dispatch(selectEdition(edition.id));
                closeDrawer();
              }}
            >
              <View style={styles.editionContainer}>
                <Text style={styles.edition}>
                  {edition.name}
                </Text>
              </View>
            </DigiTouchable>
          );
        })
      }
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

Editions.propTypes = {
  editions: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};

export default connect(state => state)(Editions);
