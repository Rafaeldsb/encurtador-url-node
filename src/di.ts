import { Container } from 'inversify';
import { AppConfig, appConfigSymbol } from './app.config';
import { Controller } from './base/controller';
import { DbModule } from './base/db-module';
import { UrlController } from './controllers/url.controller';
import { AddUrlHandler } from './handlers/url/add-url.handler';
import { GetUrlByCodeHandler } from './handlers/url/get-url-by-code.handler';
import { StringHelper } from './helpers/string.helper';
import { UrlHelper } from './helpers/url.helper';
import { UrlRepositoryMongo } from './infrastructure/mongo/repositories/url.repository';
import { MongoModule } from './infrastructure/mongo/mongo.module';
import { UrlRepository } from './repositories/url.repository';

const container = new Container();

// DI geral
container.bind<DbModule>(DbModule).to(MongoModule);
container.bind<UrlRepository>(UrlRepository).to(UrlRepositoryMongo);

// DI valores
container.bind<AppConfig>(appConfigSymbol).toConstantValue({
  port: Number(process.env.PORT) || 3000,
  mongoConnection: process.env.MONGO_CONNECTION || 'mongodb://root:root@localhost:27017/myapp?authSource=admin',
});

// DI Controllers (Pode-se adicionar múltiplos binds para a o mesmo DI token)
container.bind<Controller>(Controller).to(UrlController);

// DI Handlers
container.bind<AddUrlHandler>(AddUrlHandler).toSelf();
container.bind<GetUrlByCodeHandler>(GetUrlByCodeHandler).toSelf();

// DI others
container.bind<StringHelper>(StringHelper).toSelf();
container.bind<UrlHelper>(UrlHelper).toSelf();

export { container };
