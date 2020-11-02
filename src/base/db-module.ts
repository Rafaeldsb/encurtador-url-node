import { injectable } from 'inversify';

@injectable()
export abstract class DbModule {
  abstract init(): void;
}
