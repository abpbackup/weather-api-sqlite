import { Database } from 'sqlite3';
import { createOpenWeatherService } from './openweather.service';
import { createOtherWeatherService } from './other.service';
import { Weather, WeatherService } from './types';

const createWeatherService = () => {
  let openWeatherInstance: WeatherService;
  let otherInstance: WeatherService;
  let weatherResponses: Weather[] = [];
  let db: Database;

  const init = (_db: Database) => {
    db = _db;
    openWeatherInstance = createOpenWeatherService();
    otherInstance = createOtherWeatherService();
    console.debug('Weather services initiated');
  };

  const getWeather = async (city: string, stateCode: string, countryCode: string): Promise<Weather | null> => {
    weatherResponses = [];

    // Provider 1
    const openRes = await openWeatherInstance.getWeather(city, stateCode, countryCode);
    if (openRes) {
      weatherResponses.push(openRes);
    }

    // Provider 2
    const otherRes = await otherInstance.getWeather(city, stateCode, countryCode);
    if (otherRes) {
      weatherResponses.push(otherRes);
    }

    let aggregateWeather: Weather;

    if (openRes) {
      aggregateWeather = { ...openRes };
      if (otherRes) {
        aggregateWeather.temperature = (openRes.temperature + otherRes.temperature) / 2;
      }
    } else if (otherRes) {
      aggregateWeather = { ...otherRes };
    } else {
      return null;
    }

    saveWeather(aggregateWeather);

    return aggregateWeather;
  };

  const saveWeather = (input: Weather) => {
    const sqlInsert =
      'INSERT INTO weather (city, stateCode, countryCode, temperature, units, windSpeedInMPH, date, lat, lon, humidity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.run(
      sqlInsert,
      [
        input.city,
        input.stateCode,
        input.countryCode,
        input.temperature,
        input.units,
        input.windSpeedInMPH,
        input.date,
        input.lat,
        input.lon,
        input.humidity,
      ],
      (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.debug('Entry saved successfully', input);
        }
      }
    );
  };

  const getAll = (): Promise<Weather[]> => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM weather';
      db.all(sql, [], (err, rows: Weather[]) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(rows);
        }
      });
    });
  };

  return {
    init,
    getWeather,
    getAll,
  };
};

export const weatherService = createWeatherService();
