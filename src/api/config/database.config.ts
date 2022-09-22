import 'reflect-metadata';

import { createConnection, Connection } from 'typeorm';

/**
 * @class DatabaseConfig
 */
class DatabaseConfig {
  static async connect(): Promise<{ connection: Connection }> {
    const connection = await createConnection();

    return { connection };
  }
}

export { DatabaseConfig };
