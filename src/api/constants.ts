import { resolve } from 'node:path';

/**
 * temp
 *  - logs
 *    - production
 *    - development
 */

export const HTTP_LOGGER_DIR = resolve(__dirname, '..', '..', 'tmp', 'logs');

export const LOGGER_DEVELOPMENT = resolve(HTTP_LOGGER_DIR, 'development');
export const LOGGER_PRODUCTION = resolve(HTTP_LOGGER_DIR, 'production');

export const HTTP_LOGGER_DEVELOPMENT = resolve(LOGGER_DEVELOPMENT, 'http');
export const HTTP_LOGGER_PRODUCTION = resolve(LOGGER_PRODUCTION, 'http');
