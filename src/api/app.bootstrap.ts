import { Application } from './config/app.config';
import { DatabaseConfig } from './config/database.config';
import { Server as ServerIntance } from './config/server.config';

export async function bootstrap() {
  const { connection } = await DatabaseConfig.connect();

  const Server = ServerIntance.init(Application, {
    runInNativeHttpServer: true,
  });

  return { Server, database: connection };
}
