import React, { View, Text, StyleSheet } from 'react-native';

import DigiHeader from '../../common/DigiHeader';
import DigiTouchable from '../../common/DigiTouchable';

const editions = [
  {
    name: 'Bordeaux',
    id: 9,
  },
  {
    name: 'Montpellier',
    id: 8,
  },
  {
    name: 'Clermont-Ferrand',
    id: 23,
  },
  {
    name: 'Toulouse',
    id: 4,
  },
];

export default function Editions() {
  return (
    <View>
      <DigiHeader
        title="Editions"
      />
      {
        editions.map(edition => {
          return (
            <DigiTouchable key={edition.id} onPress={() => null}>
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

