import { calculateAverageTemperature } from './helpers';

test('avgTemp', () => {
  const temperatures = [60, 56, 89.5, 78.2];
  const avg = calculateAverageTemperature(temperatures);
  expect(avg).toBe(70.93);
});
