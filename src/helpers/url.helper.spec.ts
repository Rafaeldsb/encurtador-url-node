import { UrlHelper } from './url.helper';

jest.mock('inversify');

describe('Url Helper', () => {
  describe('addProtocolIfNotExists', () => {
    it('should return a url with protocol http given a url without protocol', () => {
      const urlHelper = new UrlHelper();

      const url = urlHelper.addProtocolIfNotExists('teste.com');

      expect(url).toBe('http://teste.com');
    });

    it('should return a url with protocol http given a url without protocol and a protocol as param', () => {
      const urlHelper = new UrlHelper();

      const url = urlHelper.addProtocolIfNotExists('teste.com', 'https');

      expect(url).toBe('https://teste.com');
    });

    it('should return the same url given a url with protocol', () => {
      const urlHelper = new UrlHelper();

      const url = urlHelper.addProtocolIfNotExists('https://teste.com');

      expect(url).toBe('https://teste.com');
    });

    it('should return the same url given a url with protocol and a different protocol as param', () => {
      const urlHelper = new UrlHelper();

      const url = urlHelper.addProtocolIfNotExists('https://teste.com', 'http');

      expect(url).toBe('https://teste.com');
    });
  });
});
