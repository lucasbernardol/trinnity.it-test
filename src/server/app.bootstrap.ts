import { Application } from './config/app.config';
import { Server as ServerIntance } from './config/server.config';

export const Server = ServerIntance.init(Application, {
  runInNativeHttpServer: true,
});
