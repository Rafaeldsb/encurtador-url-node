import express from 'express';
import { AddUrlHandler } from '../handlers/url/add-url.handler';
import { GetUrlByCodeHandler } from '../handlers/url/get-url-by-code.handler';
import { Url } from '../models/url.model';
import { UrlController } from './url.controller';

jest.mock('inversify');

describe('Url Controller', () => {
  describe('addNewUrl action', () => {
    it('should be sent a response with a new url given a url to shorten', async () => {
      const MockAddUrlHandler = jest.fn().mockImplementation(() => ({
        execute: () => new Url({
          code: 'abcde123',
          shortenedUrl: 'http://teste.com/abcde123',
          originalUrl: 'https://google.com/search?q=gold+d.+roger'
        }),
      }));
      const MockGetUrlByCodeHandler = jest.fn();

      const urlController = new UrlController(
        new MockAddUrlHandler(),
        new MockGetUrlByCodeHandler(),
      );

      const req = {
        body: { url: 'https://google.com/search?q=gold+d.+roger' },
        protocol: 'http',
        host: 'teste.com',
      } as express.Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as express.Response;

      await urlController.addNewUrl(req, res);

      expect(res.status).toBeCalledWith(201);
      expect(res.send).toBeCalledWith({ newUrl: 'http://teste.com/abcde123' });
    });
    it('should be sent a response with a status 400 when the url is not sent', async () => {
      const MockAddUrlHandler = jest.fn();
      const MockGetUrlByCodeHandler = jest.fn();

      const urlController = new UrlController(
        new MockAddUrlHandler(),
        new MockGetUrlByCodeHandler(),
      );

      const req = { body: {} } as express.Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as express.Response;

      await urlController.addNewUrl(req, res);

      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalled();
    });
  });

  describe('getUrlByCode action', () => {
    it('should be sent a redirect response when the shortened url is found', async () => {
      const MockAddUrlHandler = jest.fn();
      const MockGetUrlByCodeHandler = jest.fn().mockImplementation(() => ({
        execute: () => new Url({
          code: 'abcde123',
          shortenedUrl: 'http://teste.com/abcde123',
          originalUrl: 'https://google.com/search?q=gold+d.+roger'
        }),
      }));

      const urlController = new UrlController(
        new MockAddUrlHandler(),
        new MockGetUrlByCodeHandler(),
      );

      const req = { params: { code: 'abcde123' } } as unknown as express.Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        redirect: jest.fn(),
      } as unknown as express.Response;

      await urlController.getUrlByCode(req, res);

      expect(res.status).toBeCalledWith(301);
      expect(res.redirect).toBeCalledWith('https://google.com/search?q=gold+d.+roger');
    });
    it('should be sent a not found response when the shortened url is not found', async () => {
      const MockAddUrlHandler = jest.fn();
      const MockGetUrlByCodeHandler = jest.fn().mockImplementation(() => ({
        execute: () => false,
      }));

      const urlController = new UrlController(
        new MockAddUrlHandler(),
        new MockGetUrlByCodeHandler(),
      );

      const req = { params: { code: 'abcde123' } } as unknown as express.Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as express.Response;

      await urlController.getUrlByCode(req, res);

      expect(res.status).toBeCalledWith(404);
      expect(res.send).toBeCalled();
    });
  });
});
