import express from 'express';
import { injectable } from 'inversify';
import { Controller } from '../base/controller';
import { AddUrlHandler } from '../handlers/url/add-url.handler';
import { GetUrlByCodeHandler } from '../handlers/url/get-url-by-code.handler';

@injectable()
export class UrlController extends Controller {
  constructor(
    private addUrlHandler: AddUrlHandler,
    private getUrlByCodeHandler: GetUrlByCodeHandler,
  ) {
    super();
  }

  initRoutes(): void {
    this.router.post('/encurtador', (req, res) => this.addNewUrl(req, res));
    this.router.get('/:code', (req, res) => this.getUrlByCode(req, res));
  }

  /**
   * @swagger
   * /encurtador:
   *    post:
   *      tags:
   *        - Encurtador de URL
   *      description: Pega uma url como parametro, encurta e retorna uma nova url
   *        que redireciona para a antiga.
   *      requestBody:
   *        description: Url para ser encurtada
   *        content:
   *          'application/json':
   *            schema:
   *              type: object
   *              required:
   *                - url
   *              properties:
   *                url:
   *                  type: string
   *      responses:
   *        201:
   *          description: Url encurtada com sucesso
   *          schema:
   *            type: object
   *            properties:
   *              newUrl:
   *                type: string
   *        400:
   *          description: "Bad Request: Url não enviada"
   */
  public async addNewUrl(req: express.Request, res: express.Response): Promise<void> {
    const { url } = req.body;

    if (!url) {
      res.status(400);
      res.send({ error: 'Url precisa ser enviada' });
      return;
    }

    const model = await this.addUrlHandler.execute({
      url,
      req: { host: req.get('host') as string, protocol: req.protocol }
    });

    res.status(201);
    res.send({
      newUrl: `${model.shortenedUrl}`,
    });
  }

  /**
   * @swagger
   * /{code}:
   *    get:
   *      tags:
   *        - Redirecionador de URL encurtada
   *      description: Pega uma url encurtada como parametro e redireciona para a
   *        url original
   *      parameters:
   *        - name: code
   *          in: path
   *          description: código da url encurtada
   *          required: true
   *          schema:
   *            type: string
   *      responses:
   *        301:
   *          description: Redirecionamento para a url original
   *        404:
   *          description: código de url encurtada não encontrado
   */
  public async getUrlByCode(req: express.Request, res: express.Response): Promise<void> {
    const { code } = req.params;

    const model = await this.getUrlByCodeHandler.execute({ code });

    if (!model) {
      res.status(404);
      res.send();
      return;
    }

    res.status(301);
    res.redirect(model.originalUrl);
  }
}
