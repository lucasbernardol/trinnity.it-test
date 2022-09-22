import { env } from 'node:process';

import * as Winston from 'winston';
import 'winston-daily-rotate-file';

console.log(env.NODE_ENV);

import { format, Logger as WinstonLogger } from 'winston';

import { LOGGER_DEVELOPMENT, LOGGER_PRODUCTION } from '../constants';

type DailyTransporter =
  typeof Winston.transports.DailyRotateFileTransportOptions;

type LoggerConfigOptions = {
  error: DailyTransporter;
  info: DailyTransporter;
  debug: Winston.transports.ConsoleTransportOptions;
};

/**
 * @class LoggerConfiguration
 */
class LoggerConfiguration {
  private static instance: LoggerConfiguration;

  static get(): LoggerConfiguration {
    if (!this.instance) {
      this.instance = new LoggerConfiguration();
    }

    return this.instance;
  }

  public logger!: WinstonLogger;

  private readonly options: LoggerConfigOptions = {
    error: {
      json: true,
      level: 'error',
      filename: 'trinity-error-%DATE%',
      dirname:
        env.NODE_ENV === 'production' ? LOGGER_PRODUCTION : LOGGER_DEVELOPMENT,
      datePattern: 'YYYY-MM-DD-HH',
      maxSize: '20m',
      maxFiles: '16d',
      zippedArchive: false,
      // prettier-ignore
      format: format.combine(
        format.timestamp(),
        format.json()
      ),
      extension: '.log',
    },
    info: {
      json: true,
      level: 'info',
      filename: 'trinity-info-%DATE%',
      dirname:
        env.NODE_ENV === 'production' ? LOGGER_PRODUCTION : LOGGER_DEVELOPMENT,
      datePattern: 'YYYY-MM-DD-HH',
      maxSize: '20m',
      maxFiles: '16d',
      zippedArchive: false,
      // prettier-ignore
      format: format.combine(
        format.timestamp(),
        format.json()
      ),
      extension: '.log',
    },
    debug: {
      level: 'debug',
      format: format.simple(),
      handleRejections: true,
    },
  };

  public init() {
    this.logger = Winston.createLogger({
      level: 'info',
      transports: [
        new Winston.transports.DailyRotateFile(this.options.error),
        new Winston.transports.DailyRotateFile(this.options.info),
      ],
      exitOnError: false,
    });

    if (!['production', 'test'].includes(env.NODE_ENV as any)) {
      this.logger.add(new Winston.transports.Console(this.options.debug));
    }

    return this;
  }
}

export const Logger = LoggerConfiguration.get().init();
