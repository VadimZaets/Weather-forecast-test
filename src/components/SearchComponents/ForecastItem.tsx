import { StyleSheet, Text, View } from 'react-native';
import { formattedTemp, formattedDay } from '../../utils/utils.ts';
import React from 'react';
import { useVw } from '../../hooks/useVw.ts';
import { colors } from '../../theme/colors.ts';

export const ForecastItem = ({ item }: { item: any }) => {
  return (
    <View style={styles.forecastItem}>
      <Text style={styles.dayText}>{formattedDay(item.date)}</Text>
      <View style={styles.tempContainer}>
        <Text style={styles.tempText}>{formattedTemp(item.day.avgtemp_c)}</Text>
        <Text style={styles.degree}>°</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  forecastItem: {
    width: '100%',
    marginBottom: useVw(30),
    backgroundColor: colors.background.tertiary,
    borderRadius: useVw(8),
    paddingLeft: useVw(18),
    paddingRight: useVw(40),
    paddingVertical: useVw(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: useVw(6) },
    shadowOpacity: 0.2,
    shadowRadius: useVw(8),
    elevation: useVw(6),
  },
  dayText: {
    fontSize: useVw(18),
    color: colors.text.secondary,
  },
  tempContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  tempText: {
    fontSize: useVw(20),
    color: colors.text.secondary,
  },
  degree: {
    position: 'absolute',
    fontSize: useVw(30),
    fontWeight: '100',
    color: colors.text.secondary,
    top: -useVw(12),
    right: useVw(-11),
  },
  forecastList: {
    paddingHorizontal: useVw(32),
    zIndex: 0,
  },
});
