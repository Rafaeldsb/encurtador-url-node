import { AddUrlHandler } from './add-url.handler';
import { UrlRepository } from '../../repositories/url.repository';
import { Url } from '../../models/url.model';
import { StringHelper } from '../../helpers/string.helper';
import { UrlHelper } from '../../helpers/url.helper';

jest.mock('inversify');

const MockRepository = jest.fn().mockImplementation(() => ({
  existsByCode: (code: string): Promise<boolean> => Promise.resolve(code === 'abcde'),
  add: (url: Url): Promise<Url> => Promise.resolve(url),
} as unknown as UrlRepository));

describe('AddUrl Handler', () => {
  it('should be return a new Url instance when given a url and request data', async () => {
    const handler = new AddUrlHandler(
      new MockRepository(),
      new StringHelper(),
      new UrlHelper(),
    );

    const urlModel = await handler.execute({
      url: 'google.com',
      req: { host: 'teste.com', protocol: 'http' },
    });

    expect(urlModel).toBeInstanceOf(Url);
    expect(urlModel.originalUrl).toMatch('google.com');
  });

  it('should be return a new Url instance even when the `code` is repeated several times', async () => {
    const generateRandomCode = jest.fn()
      .mockImplementationOnce(() => 'abcde')
      .mockImplementationOnce(() => 'abcde')
      .mockImplementationOnce(() => 'xyz123');

    const MockStringHelper = jest.fn().mockImplementation(() => ({
      generateRandomCode,
    } as unknown as StringHelper));

    const handler = new AddUrlHandler(
      new MockRepository(),
      new MockStringHelper(),
      new UrlHelper(),
    );

    const urlModel = await handler.execute({
      url: 'google.com',
      req: { host: 'teste.com', protocol: 'http' },
    });

    expect(urlModel.originalUrl).toMatch('google.com');
    expect(urlModel.code).toBe('xyz123');
  });
});
