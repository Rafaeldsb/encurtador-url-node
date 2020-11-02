import { injectable } from 'inversify';
import { IHandler } from '../../base/handler';
import { Url } from '../../models/url.model';
import { UrlRepository } from '../../repositories/url.repository';

export interface GetUrlByCodeHandlerData {
  code: string;
}

@injectable()
export class GetUrlByCodeHandler implements IHandler<GetUrlByCodeHandlerData, Url | null> {
  constructor(private urlRepository: UrlRepository) { }

  public async execute(data: GetUrlByCodeHandlerData): Promise<Url | null> {
    return this.urlRepository.getByCode(data.code);
  }
}
