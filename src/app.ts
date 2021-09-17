import express, { Application, NextFunction, Request, Response } from 'express';
import IController from './types/controller';
import { logger } from 'express-winston';
import { expressWinstonConfig, NODE_ENV } from './config';

class App {
  public app: Application;
  public port: number;
  constructor(appInit: { port: number; controllers: IController[] }) {
    this.app = express();
    this.app.use(express.json());
    NODE_ENV !== 'production' && this.app.use(logger(expressWinstonConfig));
    this.port = appInit.port;
    this.routes(appInit.controllers);
    this.app.use(this.errorHandler);
  }

  private routes(controllers: IController[]) {
    try {
      controllers.forEach((controller) => {
        this.app.use('/', controller.router);
      });
    } catch (e) {
      console.log(e.message);
    }
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
  private errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    res.send(err.message);
  };
}

export default App;
