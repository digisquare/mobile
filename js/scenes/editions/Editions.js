import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'

import { selectEdition } from '../../actions/editions.js';

import DigiHeader from '../../common/DigiHeader';
import DigiTouchable from '../../common/DigiTouchable';

const Editions = ({ editions, onSelectEdition, closeDrawer }) => {
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
                onSelectEdition(edition.id);
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
  onSelectEdition: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    editions: state.editions,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectEdition: (id) => {
      dispatch(selectEdition(id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editions);
