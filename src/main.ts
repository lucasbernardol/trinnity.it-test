import 'dotenv/config';

import { bootstrap } from './api/app.bootstrap';

import { Logger } from './api/config/logger.config';

async function main(): Promise<void> {
  const { Server } = await bootstrap();

  const server = Server.listen({
    callback: ({ pid, port }) => {
      Logger.logger.debug(`PID: ${pid}`);
      Logger.logger.info(`Server runnng on port: ${port}`);
    },
  });
}

void main();
