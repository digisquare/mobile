import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import { selectEdition } from '../../actions/editions';

import DigiColors from '../../common/DigiColors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DigiColors.primaryBackgroundColor,
  },
  editionContainer: {
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

class Editions extends Component {
  static route = {
    navigationBar: {
      title: 'Edition',
    },
  }

  render() {
    const { editions, onSelectEdition } = this.props;
    return (
      <View style={styles.container}>
        {
          editions.items.map(edition => (
            <TouchableOpacity
              key={edition.id}
              onPress={() => {
                onSelectEdition(edition.id);
              }}
              style={styles.editionContainer}
            >
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
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  editions: state.editions,
});

const mapDispatchToProps = dispatch => ({
  onSelectEdition: (id) => {
    dispatch(selectEdition(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Editions);

Editions.propTypes = {
  editions: PropTypes.object.isRequired,
  onSelectEdition: PropTypes.func.isRequired,
};
