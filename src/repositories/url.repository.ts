import { ModelWithoutId } from '../base/model';
import { Url } from '../models/url.model';

export abstract class UrlRepository {
  abstract add(item: ModelWithoutId<Url>): Promise<Url>;

  abstract getByCode(code: string): Promise<Url | null>;

  abstract existsByCode(code: string): Promise<boolean>;
}
