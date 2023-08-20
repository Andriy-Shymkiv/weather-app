import axios from 'axios';
import { WeatherData } from '../types/WeatherData';

export const getWeather = async (city: string): Promise<WeatherData> => {
  const BASE_URL = `http://api.weatherapi.com/v1/current.json?key=da92ffa841a24f7f9ab131129232008&q=${city}&aqi=no`;
  const { data } = await axios.get(BASE_URL);

  return data;
};
