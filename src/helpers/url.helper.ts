import { injectable } from 'inversify';

@injectable()
export class UrlHelper {
  public addProtocolIfNotExists(url: string, protocol = 'http'): string {
    if (!/^(?:f|ht)tps?:\/\//.test(url)) {
      return `${protocol}://${url}`;
    }
    return url;
  }
}
