import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../theme/colors.ts';
import { useVw } from '../hooks/useVw.ts';
import { ForecastItem } from '../components/SearchComponents/ForecastItem.tsx';
import { SearchInput } from '../components/SearchComponents/SearchInput.tsx';
import { fetchPlaces, getWeatherForecast } from '../services/api';
import { RouteProps } from '../types/navigation.ts';

type SearchScreenProps = {
  route?: RouteProps<'Search'>;
};

export const SearchScreen = ({ route }: SearchScreenProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [places, setPlaces] = useState([]);
  const [forecastInfo, setForecastInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const locationInfo = route?.params?.locationInfo ?? '';

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    if (text.trim()) fetchPlacesData(text);
  };

  const fetchData = async () => {
    try {
      setSearchText(locationInfo);
      await fetchWeatherData(locationInfo);
    } catch (error) {
      setErrorMessage('Error during initial data fetch');
    }
  };

  const fetchPlacesData = async (query: string) => {
    const data = await fetchPlaces(query);
    if (data) {
      setPlaces(data);
    }
  };

  const handlePlaceSelect = (place: any) => {
    setSearchText(place.description);
    setPlaces([]);
  };

  const fetchWeatherData = async (cityName: string) => {
    try {
      setErrorMessage(null);
      Keyboard.dismiss();
      if (!cityName) return setErrorMessage('Please enter a city name');

      const data = await getWeatherForecast(cityName);
      if (data) {
        setForecastInfo(data);
      } else {
        setErrorMessage('Please enter the correct city name');
      }
    } catch (error) {
      setErrorMessage('Failed to fetch weather data');
    }
  };

  useEffect(() => {
    if (locationInfo) {
      fetchData();
    }
  }, [locationInfo]);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setPlaces([]),
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <View style={styles.searchContainer}>
        <SearchInput
          searchText={searchText}
          places={places}
          errorMessage={errorMessage}
          handleSearchChange={handleSearchChange}
          handlePlaceSelect={handlePlaceSelect}
        />

        <TouchableOpacity
          onPress={() => fetchWeatherData(searchText)}
          style={styles.button}>
          <Icon
            name="search"
            size={useVw(30)}
            color={colors.background.secondary}
          />
        </TouchableOpacity>
      </View>

      {forecastInfo && (
        <FlatList
          style={styles.forecastList}
          data={forecastInfo}
          renderItem={({ item }) => <ForecastItem item={item} />}
          keyExtractor={item => item.date}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: useVw(8),
    backgroundColor: colors.background.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: useVw(6),
    height: useVw(42),
    marginBottom: useVw(26),
  },
  button: {
    flex: 1,
    paddingHorizontal: useVw(10),
    paddingVertical: useVw(4),
    borderRadius: useVw(99),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: useVw(1),
    borderColor: colors.background.secondary,
    backgroundColor: colors.background.primary,
  },
  forecastList: {
    paddingHorizontal: useVw(32),
    zIndex: 0,
  },
});
