import express, { json, Application } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import sqlite3 from 'sqlite3';

import { router } from './router';
import { errorHandler } from './error-handler';
import { weatherService } from './services/weather.service';
// import { createSchema } from './schema';

config();

const db = new sqlite3.Database('./weather.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Error initiating the DB', err.message);
  } else {
    console.info('DB initiated successfully');
  }
});
// createSchema(db);

const port = process.env.PORT || 8080;

export const app: Application = express();

app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // Customize as needed
app.use(compression());
app.use(cors());
app.use(json());

app.use(router);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log('Server listening on port: ', port);
});

weatherService.init(db);

// Graceful shutdown logic
const shutdown = (signal: string) => {
  console.log(`${signal} received. Shutting down gracefully.`);
  server.close(async (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    // Close database connections or other resources here
    try {
      // Example: await db.close();
      console.log('Closed all resources. Exiting now.');
      process.exit(0);
    } catch (dbErr) {
      console.error('Failed to close some resources:', dbErr);
      process.exit(1);
    }
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
