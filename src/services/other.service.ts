import { AppError } from '../error-handler';
import { Weather, WeatherService } from './types';

export const createOtherWeatherService = (): WeatherService => {
  const otherWeatherUrl = 'http://api.openweathermap.org';

  const getWeather = async (city: string, stateCode: string, countryCode: string): Promise<Weather | null> => {
    const res = await fetch(
      `${otherWeatherUrl}/data/2.5/weather?q=${city},${stateCode},${countryCode}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`,
      {
        method: 'GET',
      }
    );

    if (res.ok) {
      const data = await res.json();

      let weather: Weather = {
        city,
        stateCode,
        countryCode,
        source: 'otherweathermap',
        temperature: data.main.temp,
        lat: data.coord.lat,
        lon: data.coord.lon,
        date: new Date(),
        units: 'imperial',
        humidity: data.main.humidity,
      };

      return weather;
    } else {
      throw new AppError(res.statusText, res.status);
    }
  };

  return {
    getWeather,
  };
};
