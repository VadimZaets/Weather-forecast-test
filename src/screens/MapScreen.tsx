import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { MapStyle } from '../theme/mapStyle';
import { MapHeader } from '../components/MapComponents/MapHeader.tsx';
import { CustomMarker } from '../components/MapComponents/CustomMarker.tsx';
import { Marker, MarkerRef } from '../types/MapType.ts';
import { fetchLocationInfo, getWeatherForecast } from '../services/api.ts';

export const MapScreen = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [locationInfo, setLocationInfo] = useState<string>('');
  const [weatherInfo, setWeatherInfo] = useState<string>('');
  const [activeMarkerId, setActiveMarkerId] = useState<number | null>(null);
  const [region, setRegion] = useState({
    latitude: 48.3794,
    longitude: 31.1656,
    latitudeDelta: 15,
    longitudeDelta: 15,
  });

  const mapRef = useRef<MapView>(null);
  const markerRefs = useRef<Record<number, MarkerRef | undefined>>({});

  const onLongPress = async (e: any) => {
    const coordinate = e.nativeEvent.coordinate;

    const newMarker = {
      id: Date.now(),
      coordinate,
    };

    setMarkers([newMarker]);
    setActiveMarkerId(null);

    const location = await fetchLocationInfo(
      coordinate.latitude,
      coordinate.longitude,
    );
    const weatherData = await getWeatherForecast(location);
    if (weatherData && weatherData.length > 0) {
      setWeatherInfo(weatherData[0].day.avgtemp_c);
    }

    setLocationInfo(location);
  };

  const toggleCallout = (markerId: number) => {
    const selectedMarker = markers.find(marker => marker.id === markerId);

    if (!selectedMarker) return;

    if (activeMarkerId === markerId) {
      markerRefs.current[markerId]?.hideCallout();
      setActiveMarkerId(null);
    } else {
      markerRefs.current[markerId]?.showCallout();
      setActiveMarkerId(markerId);

      const offsetLongitude = region.longitudeDelta * 0.25;
      const newLongitude =
        selectedMarker.coordinate.longitude + offsetLongitude;

      mapRef.current?.animateToRegion(
        {
          latitude: selectedMarker.coordinate.latitude,
          longitude: newLongitude,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta,
        },
        500,
      );
    }
  };
  return (
    <View style={styles.container}>
      <MapHeader />
      <MapView
        ref={mapRef}
        style={styles.map}
        customMapStyle={MapStyle}
        onLongPress={onLongPress}
        showsCompass={false}
        initialRegion={region}
        onRegionChangeComplete={newRegion => setRegion(newRegion)}>
        {markers.map(marker => (
          <CustomMarker
            key={marker.id}
            marker={marker}
            locationInfo={locationInfo}
            weatherInfo={weatherInfo}
            toggleCallout={toggleCallout}
            markerRefs={markerRefs}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
