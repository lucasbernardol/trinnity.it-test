import * as Winston from 'winston';
import 'winston-daily-rotate-file';

import { format, Logger as WinstonLogger } from 'winston';

import { resolve } from 'node:path';

import {} from 'winston';

const LOGS_DIR = resolve(__dirname, '..', '..', '..', 'temp', 'logs');

const env = 'dev';

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
      json: false,
      level: 'error',
      filename: 'trinity-error-%DATE%',
      dirname: LOGS_DIR,
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
      json: false,
      level: 'info',
      filename: 'trinity-info-%DATE%',
      dirname: LOGS_DIR,
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

    if (!['production', 'test'].includes(env)) {
      this.logger.add(new Winston.transports.Console(this.options.debug));
    }

    return this;
  }
}

export const Logger = LoggerConfiguration.get().init();
