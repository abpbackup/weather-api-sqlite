import { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.name = 'AppError';
    this.statusCode = statusCode;
  }
}

export const errorHandler = (error: AppError | Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    console.error(error.message);
    res.status(error.statusCode).json({ error: error.message });
  } else {
    console.error(error); // or use a more sophisticated logging solution
    res.status(500).json({ error: 'application error', message: error.message ?? error, stackTrace: error.stack });
  }
};
