import { createConnection, Connection } from 'typeorm';

/**
 * @class Database
 */
export class Database {
  static async connect(): Promise<{ connection: Connection }> {
    const connection = await createConnection();

    return { connection };
  }
}
