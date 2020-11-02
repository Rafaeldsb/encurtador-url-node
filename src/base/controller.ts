import express from 'express';
import { injectable } from 'inversify';

@injectable()
export abstract class Controller {
  constructor() {
    this.initRoutes();
  }

  abstract initRoutes(): void;

  public router: express.Router = express.Router();
}
