import { GetUrlByCodeHandler } from './get-url-by-code.handler';
import { UrlRepository } from '../../repositories/url.repository';
import { Url } from '../../models/url.model';

jest.mock('inversify');

const urlModel = new Url({
  code: 'abc',
  originalUrl: 'google.com/b-1w',
  shortenedUrl: 'teste.com/abca2a',
});

const MockRepository = jest.fn().mockImplementation(() => ({
  getByCode: (code: string): Promise<Url | null> => Promise.resolve(
    code === 'abc' ? urlModel : null,
  ),
} as unknown as UrlRepository));

describe('GetUrlByCode Handler', () => {
  it('should be return a Url instance when exists a url code at UrlRepository', async () => {
    const mockRepository = new MockRepository();

    const url = await new GetUrlByCodeHandler(mockRepository).execute({ code: 'abc' });

    expect(url).toEqual(urlModel);
  });

  it('should be return null when not exists a url code at UrlRepository', async () => {
    const mockRepository = new MockRepository();

    const url = await new GetUrlByCodeHandler(mockRepository).execute({ code: '123' });

    expect(url).toBeNull();
  });
});
