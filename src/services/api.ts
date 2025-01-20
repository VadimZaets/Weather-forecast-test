import Geocoder from 'react-native-geocoding';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export const fetchLocationInfo = async (
  latitude: number,
  longitude: number,
) => {
  try {
    const response = await Geocoder.from(latitude, longitude);

    const city = response.results[0]?.address_components.find(component =>
      component.types.includes('locality'),
    );
    const country = response.results[0]?.address_components.find(component =>
      component.types.includes('country'),
    );

    if (city && country) {
      return `${city.long_name}, ${country.long_name}`;
    } else if (country) {
      return country.long_name;
    } else {
      return 'Location not found';
    }
  } catch (error) {
    console.error(error);
    return 'Error fetching location';
  }
};

export const fetchPlaces = async (query: string) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${GOOGLE_PLACES_API_KEY}`,
    );
    const data = await response.json();
    return data.predictions || [];
  } catch (error) {
    console.error('Error fetching places:', error);
    return [];
  }
};

export const getWeatherForecast = async (cityName: string) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${cityName}&days=7`,
    );
    const data = await response.json();
    return data.forecast.forecastday || [];
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    return null;
  }
};
