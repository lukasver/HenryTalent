import express, { Application } from 'express';
import os from 'os';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import l from './logger';
import errorHandler from '../api/middlewares/error.handler';
import setUpOpenAPI from './openapi';

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

export default class ExpressServer {
  private routes: (app: Application) => void;
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    const requestLimit = process.env.REQUEST_LIMIT || '100kb';
    app.set('appPath', root + 'client');
    app.use(bodyParser.json({ limit: requestLimit }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: requestLimit,
      })
    );
    app.use(bodyParser.text({ limit: requestLimit }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));
    // TODO: configure CORS?;
    app.use(cors(corsOptions));

    setUpOpenAPI(app);
  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(app);
    app.use(errorHandler);
    return this;
  }

  listen(port: number): Application {
    const welcome = (p: number) => (): void =>
      l.info(
        `up and running in ${
          process.env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${p}}`
      );

    http.createServer(app).listen(port, welcome(port));

    return app;
  }
}
