import {
  utilities as nestWinstonModuleUtilities,
  WinstonModuleOptions,
} from 'nest-winston';
import * as winston from 'winston';
import { MongoDB } from 'winston-mongodb'
import 'dotenv/config';

const options = {
  console: {
    db: process.env.MONGO_URL,
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    collection: 'logs',
  },
  error: {
    db: process.env.MONGO_URL,
    level: 'error',
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    collection: 'logs',
  }
};

export const winstonConfig: WinstonModuleOptions = {
  levels: winston.config.npm.levels,
  level: 'verbose',
  transports: [
    // Terminal
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),

    // File
    // new winston.transports.File({
    //   level: 'verbose',
    //   filename: 'application.log',
    //   dirname: 'logs',
    // }),

    // MongoDB
    new MongoDB(options.console),
    new MongoDB(options.error),

  ],
};