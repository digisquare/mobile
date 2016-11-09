import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import { selectEdition } from '../../actions/editions';

import DigiHeader from '../../common/DigiHeader';
import DigiTouchable from '../../common/DigiTouchable';
import DigiColors from '../../common/DigiColors';

import backWhite from '../../common/img/back_white.png';

const styles = StyleSheet.create({
  container: {
    backgroundColor: DigiColors.primaryBackgroundColor,
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
    color: DigiColors.secondaryFontColor,
  },
  switchContainer: {
    paddingTop: 15,
    paddingRight: 30,
  },
});

const Editions = ({ navigator, editions, onSelectEdition }) => (
  <View style={styles.container}>
    <DigiHeader
      title="Edition"
      leftItem={{
        icon: backWhite,
        onPress: () => navigator.pop(),
      }}
    />
    {
      editions.items.map(edition => (
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
                  <Icon
                    name="check" size={20} style={styles.icon}
                    color={DigiColors.primaryFontColor}
                  />
                ) : null
              }
            </View>
          </View>
        </DigiTouchable>
      ))
    }
  </View>
);

Editions.propTypes = {
  navigator: PropTypes.object.isRequired,
  editions: PropTypes.object.isRequired,
  onSelectEdition: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  editions: state.editions,
});

const mapDispatchToProps = dispatch => ({
  onSelectEdition: (id) => {
    dispatch(selectEdition(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Editions);
