import request from 'supertest';
import { app } from './server';

describe('GET /weather', () => {
  it('responds with json', async () => {
    const response = await request(app)
      .get('/weather?=London&stateCode=LN&countryCode=')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toEqual({
      error: 'city (string),  stateCode: string(2), and countryCode: string(2) are required query params',
    });
  });
});

describe('GET /weather', () => {
  it('responds with the correct structure', async () => {
    const response = await request(app)
      .get('/weather?city=London&stateCode=LN&countryCode=GB')
      .expect('Content-Type', /json/)
      .expect(200);

    const weather = response.body;
    expect(typeof weather.city).toBe('string');
    expect(typeof weather.stateCode).toBe('string');
    expect(typeof weather.countryCode).toBe('string');
    expect(typeof weather.temperature).toBe('number');
    expect(typeof weather.lat).toBe('number');
    expect(typeof weather.lon).toBe('number');
    expect(['imperial', 'metric']).toContain(weather.units);
    if (weather.hasOwnProperty('humidity')) {
      expect(typeof weather.humidity).toBe('number');
    }
    if (weather.hasOwnProperty('windSpeedInMPH')) {
      expect(typeof weather.windSpeedInMPH).toBe('number');
    }
  });
});
