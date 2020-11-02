import { injectable } from 'inversify';
import { IHandler } from '../../base/handler';
import { Url } from '../../models/url.model';
import { UrlRepository } from '../../repositories/url.repository';
import { UrlHelper } from '../../helpers/url.helper';
import { StringHelper } from '../../helpers/string.helper';

export interface AddUrlData {
  url: string;
  req: {
    protocol: string;
    host: string;
  }
}

@injectable()
export class AddUrlHandler implements IHandler<AddUrlData, Url> {
  private data!: AddUrlData;

  private code!: string;

  private shortenedUrl!: string;

  constructor(
    private urlRepository: UrlRepository,
    private stringHelper: StringHelper,
    private urlHelper: UrlHelper,
  ) { }

  public async execute(data: AddUrlData): Promise<Url> {
    this.data = data;
    return this.create();
  }

  private async generateUniqueCode(): Promise<string> {
    const code = this.stringHelper.generateRandomCode(5, 10);
    if (await this.urlRepository.existsByCode(code)) {
      return this.generateUniqueCode();
    }
    return code;
  }

  private generateShortenedUrl(): string {
    return `${this.data.req.protocol}://${this.data.req.host}/${this.code}`;
  }

  private async create(): Promise<Url> {
    this.code = await this.generateUniqueCode();
    this.shortenedUrl = this.generateShortenedUrl();

    const originalUrl = this.urlHelper.addProtocolIfNotExists(this.data.url);

    const url = new Url({ originalUrl, shortenedUrl: this.shortenedUrl, code: this.code });
    return this.urlRepository.add(url);
  }
}
