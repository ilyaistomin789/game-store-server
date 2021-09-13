import * as dotenv from 'dotenv';
import { transports, format } from 'winston';
dotenv.config();

export const DB_DATABASE_NAME = process.env.DB_DATABASE_NAME!;
export const DB_USERNAME = process.env.DB_USERNAME!;
export const DB_HOST = process.env.DB_HOST!;
export const DB_PORT = process.env.DB_PORT!;
export const DB_PASSWORD = process.env.DB_PASSWORD!;
export const NODE_ENV = process.env.NODE_ENV!;
export const DB = process.env.DB!;

export const expressWinstonConfig = {
  transports: [new transports.Console()],
  format: format.combine(format.colorize(), format.json()),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
};
export const winstonConfig = {
  level: 'info',
  format: format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({ filename: 'debug.log', level: 'debug' }),
    new transports.Console({
      format: format.json(),
      level: 'debug',
    }),
  ],
};
