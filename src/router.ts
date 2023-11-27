import { NextFunction, Request, Response, Router } from 'express';
import { weatherService } from './services/weather.service';
import { AppError } from './error-handler';

export const router = Router();

router.get('/weather', async (req: Request, res: Response, next: NextFunction) => {
  const queryParams = req.query;

  if (!queryParams['city'] || !queryParams['stateCode'] || !queryParams['countryCode']) {
    const error = new AppError(
      'city (string),  stateCode: string(2), and countryCode: string(2) are required query params',
      400
    );
    next(error);
    return;
  }

  const city = String(queryParams['city']);
  const stateCode = String(queryParams['stateCode']);
  const countryCode = String(queryParams['countryCode']);

  try {
    const weather = await weatherService.getWeather(city, stateCode, countryCode);
    res.json(weather);
  } catch (error) {
    next(error);
  }
});

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await weatherService.getAll();
    res.json(data);
  } catch (error) {
    next(error);
  }
});
