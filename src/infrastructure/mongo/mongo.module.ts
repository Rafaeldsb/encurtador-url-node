import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';
import { AppConfig, appConfigSymbol } from '../../app.config';
import { DbModule } from '../../base/db-module';

@injectable()
export class MongoModule extends DbModule {
  constructor(@inject(appConfigSymbol) private appConfig: AppConfig) {
    super();
  }

  public init(): void {
    if (!this.appConfig.mongoConnection) {
      throw new Error('Connection string do MongoDb deve ser inserido');
    }
    mongoose.connect(this.appConfig.mongoConnection, { useNewUrlParser: true });
  }
}
