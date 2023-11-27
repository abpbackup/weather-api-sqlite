import { Database } from 'sqlite3';

export const createSchema = (db: Database) => {
  db.run('DROP TABLE IF EXISTS weather');
  db.run(`CREATE TABLE IF NOT EXISTS weather (
      id integer PRIMARY KEY,
      city varchar(50),
      stateCode varchar(2),
      countryCode varchar(2),
      temperature integer,
      units varchar(20),
      windSpeedInMPH integer default null,
      date datetime,
      lat interger,
      lon integer,
      humidity integer default null
    )`);
};
