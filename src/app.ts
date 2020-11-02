import express from 'express';
import { Container } from 'inversify';
import * as bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { AppConfig, appConfigSymbol } from './app.config';
import { Controller } from './base/controller';
import { DbModule } from './base/db-module';

export class App {
  public appConfig: AppConfig;

  public controllers: Controller[];

  constructor(
    private container: Container,
    private app: express.Application,
  ) {
    this.appConfig = this.container.get<AppConfig>(appConfigSymbol);
    this.controllers = this.container.getAll(Controller);

    this.initializeDbs();
    this.initializeMiddlewares();
    this.initializeSwagger();
    this.initializeControllers();
  }

  private initializeDbs(): void {
    this.container.getAll(DbModule).forEach((dbModule) => {
      dbModule.init();
    });
  }

  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(): void {
    this.controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeSwagger(): void {
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Encurtador de URLs',
          version: '1.0.0',
        },
      },
      apis: ['**/*.ts'],
    };

    const swaggerSpec = swaggerJSDoc(options);
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  public listen(): void {
    this.app.listen(this.appConfig.port, () => {
      // eslint-disable-next-line no-console
      console.log(`App listening on the port ${this.appConfig.port}`);
    });
  }
}
