import express, { Application } from 'express';
import IController from './types/controller';

class App {
  public app: Application;
  public port: number;
  constructor(appInit: { port: number; controllers: IController[] }) {
    this.app = express();
    this.app.use(express.json());
    this.port = appInit.port;
    this.routes(appInit.controllers);
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
}

export default App;
