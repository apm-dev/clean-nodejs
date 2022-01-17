import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import WithdrawController from './controllers/withdraw';

export class HttpServer {
  private _express: Express;
  private _withdrawController: WithdrawController;

  constructor(express: Express, withdrawController: WithdrawController) {
    this._express = express;
    this._withdrawController = withdrawController;
    this.registerRoutes();
  }

  public start(host: string, port: number) {
    this._express.listen(port, host, () => {
      console.log(`http server is up on ${host}:${port}`);
    });
  }

  private registerRoutes() {
    this._express.get('/', (req: Request, res: Response) => {
      res.send('Hello Dude! :)');
    });

    this._express.post('/withdraw', this._withdrawController.submitWithdraw);
  }
}
