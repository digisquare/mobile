import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'

import { selectEdition } from '../../actions/editions.js';

import DigiHeader from '../../common/DigiHeader';
import DigiTouchable from '../../common/DigiTouchable';

const Editions = ({ navigator, editions, onSelectEdition }) => {
  return (
    <View style={styles.container}>
      <DigiHeader
        title="Edition"
        leftItem={{
          icon: require('../../common/img/back_white.png'),
          onPress: () => navigator.pop(),
        }}
      />
      {
        editions.items.map(edition => {
          return (
            <DigiTouchable
              key={edition.id}
              onPress={() => {
                onSelectEdition(edition.id);
              }}
            >
              <View style={styles.editionContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.editionName}>
                    {edition.name}
                  </Text>
                </View>
                <View style={styles.switchContainer}>
                  {
                    edition.id === editions.selectedEdition ? (
                      <Icon name="check" size={20} color="black" style={styles.icon} />
                    ) : null
                  }
                </View>
              </View>
            </DigiTouchable>
          );
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  editionContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 56,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
  },
  editionName: {
    fontSize: 18,
    fontWeight: '900',
    color: 'grey',
  },
  switchContainer: {
    paddingTop: 15,
    paddingRight: 30,
  },
});

Editions.propTypes = {
  navigator: PropTypes.object.isRequired,
  editions: PropTypes.object.isRequired,
  onSelectEdition: PropTypes.func.isRequired,
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
