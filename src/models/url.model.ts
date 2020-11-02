import { ModelBase } from '../base/model';

export interface UrlOptions {
  originalUrl: string;
  code: string;
  shortenedUrl: string;
}

export class Url extends ModelBase {
  public originalUrl: string;

  public code: string

  public shortenedUrl: string;

  constructor(options: UrlOptions) {
    super();
    this.originalUrl = options.originalUrl;
    this.shortenedUrl = options.shortenedUrl;
    this.code = options.code;
  }
}
