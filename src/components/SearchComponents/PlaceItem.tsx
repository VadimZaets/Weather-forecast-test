import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useVw } from '../../hooks/useVw.ts';
import { colors } from '../../theme/colors.ts';

export const PlaceItem = ({
  item,
  onSelect,
}: {
  item: any;
  onSelect: (place: any) => void;
}) => (
  <TouchableOpacity onPress={() => onSelect(item)} style={styles.placeItem}>
    <Text style={styles.placeText}>{item.description}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  placesList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: colors.background.primary,
    width: '100%',
    maxHeight: 200,
    borderWidth: useVw(1),
    borderColor: 'lightgray',
  },
  placeItem: {
    padding: useVw(10),
    borderBottomWidth: useVw(1),
    borderColor: 'lightgray',
  },
  placeText: {
    fontSize: useVw(16),
    color: colors.text.primary,
  },
});
