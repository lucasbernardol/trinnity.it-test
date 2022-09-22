import { createServer, Server as HTTPServer } from 'node:http';

import { Application } from 'express';
import { Logger } from './logger.config';

type InitConfigOptions = {
  runInNativeHttpServer?: boolean;
};

type ServerListenParams = {
  pid: number;
  port: number;
  timestamp: number;
};

type ServerListenCallback = (params: ServerListenParams) => void;

type ServerListenConfigOptions = {
  port?: number;
  callback?: ServerListenCallback;
};

class ServerConfiguration {
  private static instance: ServerConfiguration;

  private _port: number = 3333;
  private _application!: Application | HTTPServer;

  /**
   * @description Get `Server` instance.
   */
  static get(): ServerConfiguration {
    const serverInstanceNotExits = !this.instance;

    if (serverInstanceNotExits) {
      this.instance = new ServerConfiguration();
    }

    return this.instance;
  }

  private constructor() {}

  public init(
    application: Application,
    options: InitConfigOptions = { runInNativeHttpServer: true }
  ) {
    const applicationOrServer = options.runInNativeHttpServer
      ? createServer(application)
      : application;

    this._application = applicationOrServer;

    return this;
  }

  /**
   * @description Listen application/server.
   */
  public listen({
    port = this._port,
    callback,
  }: ServerListenConfigOptions = {}): HTTPServer {
    const isCallbackFunction: boolean = typeof callback === 'function';

    const handleCallback = (params: any) => {
      const callbackFn = callback as any; // Scoped

      return callbackFn(params);
    };

    const serverCallbackFunction = isCallbackFunction
      ? (params: any) => handleCallback(params)
      : () => Logger.logger.info('Server run at port: 3333');

    /**
     * - Add `listening` event and execute `callcack` function.
     */
    const server = this._application.listen(port, (): void => {
      const MILLISECONDS_AMOUNT: number = 1000;

      const pid = process.pid;

      const address = server.address() as { address: string };

      // Timestamp in milleseconds
      const now = Date.now();

      const timestamp: number = Math.floor(now / MILLISECONDS_AMOUNT);

      // Invoke: `callback` function.
      const parameters = { pid, port, address: address?.address, timestamp };

      return serverCallbackFunction.apply(null, [parameters]) as any;
    });

    return server;
  }
}

export const Server = ServerConfiguration.get();
