import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useVw } from '../../hooks/useVw.ts';
import { colors } from '../../theme/colors.ts';

export const MapHeader = () => (
  <View style={styles.header}>
    <Text style={styles.locationText}>LOCATION</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: useVw(30),
    zIndex: 1,
  },
  locationText: {
    fontSize: useVw(14),
    fontWeight: 'bold',
    color: colors.text.tertiary,
  },
});
