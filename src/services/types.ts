export type Weather = {
  id?: number;
  city: string;
  stateCode: string;
  countryCode: string;
  temperature: number;
  units: 'metric' | 'imperial';
  windSpeedInMPH?: number;
  date: Date;
  source: string;
  lat?: number;
  lon?: number;
  humidity?: number;
};

export type WeatherService = {
  getWeather: (city: string, stateCode: string, countryCode: string) => Promise<Weather | null>;
};
