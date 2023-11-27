import { AppError } from '../error-handler';
import { Weather, WeatherService } from './types';

export const createOpenWeatherService = (): WeatherService => {
  const openWeatherUrl = 'http://api.openweathermap.org';

  const getWeather = async (city: string, stateCode: string, countryCode: string): Promise<Weather | null> => {
    const res = await fetch(
      `${openWeatherUrl}/data/2.5/weather?q=${city},${stateCode},${countryCode}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`,
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
        source: 'openweathermap',
        temperature: data.main.temp,
        lat: data.coord.lat,
        lon: data.coord.lon,
        windSpeedInMPH: data.wind.speed,
        date: new Date(),
        units: 'imperial',
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
