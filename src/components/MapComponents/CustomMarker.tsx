import React, { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import { useVw } from '../../hooks/useVw.ts';
import { colors } from '../../theme/colors.ts';
import { CustomMarkerProps } from '../../types/MapType.ts';
import { Shadow } from 'react-native-shadow-2';
import { formattedTemp } from '../../utils/utils.ts';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../types/navigation.ts';

export const CustomMarker: FC<CustomMarkerProps> = ({
  marker,
  locationInfo,
  toggleCallout,
  markerRefs,
  weatherInfo,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const temp = formattedTemp(Number(weatherInfo));

  return (
    <Marker
      key={marker.id}
      coordinate={marker.coordinate}
      calloutAnchor={{ x: 2.7, y: 0 }}
      ref={ref => {
        if (ref) {
          markerRefs.current[marker.id] = ref;
        }
      }}
      onPress={() => toggleCallout(marker.id)}>
      <Image
        source={require('../../../assets/icon/location.png')}
        style={styles.customMarker}
      />
      <Callout
        tooltip
        style={{ padding: 10 }}
        onPress={() => navigation.navigate('Search', { locationInfo })}>
        <Shadow distance={5} startColor="#00000020" offset={[1, 1]}>
          <View style={styles.customCallout}>
            <Text style={styles.locationInfo}>{locationInfo}</Text>
            <View style={styles.tempContainer}>
              <Text style={styles.weatherInfo}>{temp}</Text>
              <Text style={styles.degree}>°</Text>
            </View>
          </View>
        </Shadow>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  customMarker: {
    width: useVw(45),
    height: useVw(45),
  },
  customCallout: {
    paddingHorizontal: useVw(26),
    paddingVertical: useVw(15),
    width: useVw(228),
    minHeight: useVw(88),
    borderRadius: useVw(4),
    backgroundColor: colors.background.primary,
  },
  locationInfo: {
    fontSize: useVw(16),
    marginBottom: useVw(8),
  },
  tempContainer: {
    flexDirection: 'row',
  },
  weatherInfo: {
    fontSize: useVw(16),
  },
  degree: {
    fontSize: useVw(30),
    fontWeight: '100',
    transform: [{ translateY: -useVw(10) }],
  },
});
