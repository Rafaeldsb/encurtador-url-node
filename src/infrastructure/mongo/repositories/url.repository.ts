import { injectable } from 'inversify';
import { ModelWithoutId } from '../../../base/model';
import { Url } from '../../../models/url.model';
import { UrlRepository } from '../../../repositories/url.repository';
import { UrlModel } from '../models/url.model';

@injectable()
export class UrlRepositoryMongo implements UrlRepository {
  public add(item: ModelWithoutId<Url>): Promise<Url> {
    return UrlModel.create(item);
  }

  public getByCode(code: string): Promise<Url | null> {
    return UrlModel.findOne({ code }).exec();
  }

  public existsByCode(code: string): Promise<boolean> {
    return UrlModel.exists({ code });
  }
}
