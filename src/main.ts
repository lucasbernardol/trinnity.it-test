import { Server } from './server/app.bootstrap';

const server = Server.listen({
  port: 3333,
  // callback(params) {
  //   console.log(params);
  // },
});
