// weather.service.ts
export const calculateAverageTemperature = (temperatures: number[]): number => {
  const sum = temperatures.reduce((acc, cur) => {
    return (acc += cur);
  }, 0);

  return Math.round((sum / temperatures.length) * 100) / 100;
};
