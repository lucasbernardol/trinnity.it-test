import { json, urlencoded } from 'express';

import morgan from 'morgan';
import compression from 'compression';

import { ExpressFactory } from './express.factory';
import { routes } from './main.routes';

const app = ExpressFactory.create();

app.use(compression());

app.use(json());
app.use(urlencoded({ extended: false }));

app.use(morgan('dev'));
app.use(routes);

export { app };
