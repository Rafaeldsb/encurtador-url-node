# Encurtador de URL
![CircleCI](https://img.shields.io/circleci/build/github/Rafaeldsb/encurtador-url-node/master?token=7250cd3a7d3535a5427fb369c4656a9dbec69ead) ![Codacy coverage](https://img.shields.io/codacy/coverage/53bde3ccfb3346bd8cf7fcd9fe459c1a) ![Codacy coverage](https://img.shields.io/codacy/grade/53bde3ccfb3346bd8cf7fcd9fe459c1a)

## Descrição<a name="descricao"></a>
Projeto em node para encurtar URL e redirecionar para a URL original.

## Tabela de Conteúdos
* [Descrição](#descricao)
* [Tabela de Conteúdos](#tabela-conteudo)
* [Tecnologias](#tecnologias)
* [Pré-requisitos](#pre-requisitos)
* [Instalação e uso](#instalacao)
  * [Local](#instalacao-local)
  * [Docker](#instalacao-docker)
* [Como funciona](#como-funciona)
* [Documentação e Demo](#documentacao)
* [Testes](#testes)
* [Features](#features)
* [Considerações](#consideracoes)
  * [Design Patterns](#consideracoes-design-patterns)
  * [Testes](#consideracoes-design-patterns)
  * [Outros](#consideracoes-outros)

## Tecnologias<a name="tecnologias"></a>
#### Runtime
  * Node 14
  * Express
  * Inversify
  * Mongoose
  * Swagger
#### Desenvolvimento
  * Typescript 4
  * Jest
  * Eslint
  * Nodemon
#### Infra e CI
  * Heroku
  * MongoDB
  * CircleCI

## Pré-requisitos <a name="pre-requisitos"></a>
  * Node 14
  * MongoDB

## Instalação e uso <a name="instalacao"></a>
Para usar a aplicação é necesssário instalar o node 14 + MongoDB ou o docker.

#### Local <a name="instalacao-local"></a>
Utilize o [site oficial](https://nodejs.org/en/download/) do nodejs para baixar ou o [nvm](https://github.com/nvm-sh/nvm):
```bash
nvm install 14
``` 

Instale o MongoDB, siga o [site oficial](https://docs.mongodb.com/manual/installation/) para instalar de acordo com o seu SO.

Para executar a aplicação é necessário informar a connection string de conexão com o MongoDB. 
Para isso há principalmente duas formas, uma é modificando direto o arquivo `src/di.ts` e inserindo o do seu banco:
```ts
container.bind<AppConfig>(appConfigSymbol).toConstantValue({
  ...
  mongoConnection: process.env.MONGO_CONNECTION || 'mongodb://root:root@localhost:27017/myapp?authSource=admin',
});
```
Ou setando como variável de ambiente, seja na seção, definitivo no terminal ou somente para rodar o comando.
Algumas opções:
```bash
export MONGO_CONNECTION=mongodb://root:root@localhost:27017/myapp?authSource=admin

// ou na hora de executar o start
MONGO_CONNECTION=mongodb://root:root@localhost:27017/myapp?authSource=admin npm run start
```

Após tudo instalado e configurado, para executar a aplicação instale as dependencias do projeto e execute localmente:
```bash
npm install
npm run start
```

#### Docker <a name="instalacao-docker"></a>
Consulte o site oficial para instalar o [Docker](https://docs.docker.com/get-docker/) e o [Docker-Compose](https://docs.docker.com/compose/install/).
Após isso baixe o projeto e execute para iniciar a aplicação:
```bash
docker-compose up -d --build
```
Isso irá criar tanto o banco MongoDB localmente quanto irá iniciar a aplicação já se conectando a esse banco.

## Como funciona <a name="como-funciona"></a>

#### Arquivos e pastas
```
.
├── src
│   ├── base/
│   │   ├── controller.ts
│   │   ├── db-module.ts // Módulo Base para conectividade com banco
│   │   ├── handler.ts
│   │   └── model.ts
│   ├── controllers
│   ├── handlers // Gerencia ações e queries das actions dos controllers
│   ├── helpers // Classes auxiliares
│   ├── models // Models do domínio da aplicação
│   ├── repositories // Abstração dos repositories
│   ├── infrastructure // Faz a camada de persistencia de dados
│   │   └── mongo
│   │       ├── repositories // Implementação dos repositórios para o MongoDB
│   │       ├── models // Persistencia dos models de domínio no banco
│   │       └── mongo.module.ts // Módulo de conectividade com o MongoDB
│   ├── app.config.ts // Abstração e Token da configuração da aplicação
│   ├── app.ts // Classe que gerencia toda a aplicação
│   ├── di.ts // Configuração de todas as injeções de dependencias da aplicação
│   └── server.ts
├── docker-compose.yaml
├── jest.config.js
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```


#### Funcionamento
O arquivo principal dessa aplicação é o `src/app.ts`, nele está contido todo o gerenciamento de controllers, middlewares e connectividade com o banco de dados.

Tanto os controllers quanto os bancos de dados (a princípio somente o MongoDB) são inicializados por Injeção de Dependência, configurados no arquivo `src/di.ts`. Os controllers usam uma classe abstrata `src/base/controller.ts` para servir como token para o DI, podendo inclusive inserir múltiplos controllers nesse mesmo token. A mesma coisa serve para os bancos de dados, tendo como token a classe abstrata em `src/base/db-module.ts`.

Injetado todos os recursos necessários, bancos, controllers, repositórios, handlers, helpers e configurações, a aplicação percorre todos os controllers e estabelece as rotas de acordo com o fornecido em cada controller (sendo obrigatório informar de acordo com o Controller base).

Após isso, a aplicação está pronta para rodar e é executado o método `listen` onde começa a escutar uma porta dentro do SO.

## Documentação e Demo <a name="documentacao"></a>
É possível consultar a documentação da API [aqui](https://redirect-shorten-url.herokuapp.com/docs/).

A Demo se encontra na seguinte url:
https://redirect-shorten-url.herokuapp.com/


## Testes <a name="testes"></a>
Os testes foram feitos principalmente no core do modelo de negócios, tendo alguns arquivos ainda faltando testes.

A localização dos testes encontram-se na mesma pasta das implementações dos mesmos, com um sufixo `.spec`, logo o controller `src/controllers/url.controller.ts` o seu teste será `src/controllers/url.controller.spec.ts`.

Foram implementado somente testes de unidade por enquanto, faltando principalmente testes de integração e testes de carga.

Para executar os testes basta rodar:
```bash
npm run test

// Ou caso esteja em desenvolvimento e queira ficar vendo em tempo real as mudanças:
npm run test:watch
```

## Features <a name="features"></a>
- [x] Configuração e estruturação inicial do projeto
- [x] Configurar Eslint
- [x] Configurar Testes
- [x] Configurar Controllers
- [x] Configurar Handlers
- [x] Configurar Repositories
- [x] Configurar Helpers
- [x] Configurar Banco de dados
- [x] Aplicar Injeção de Dependência e IoC
- [x] Aplicar Repository Pattern
- [x] Aplicar MVC
- [x] Criar swagger
- [x] Configurar docker e docker-compose
- [x] Configurar hospedagem
- [x] Configurar CI/CD
- [x] Adicionar badges no readme
- [x] Adicionar alguma plataforma de code analysis (Codacy)

Melhorias
- [ ] Melhorar inversão de controle em `src/app.ts`
- [ ] Aplicar testes de unidade no restante da aplicação
- [ ] Aplicar testes de integração
- [ ] Aplicar testes de carga
- [ ] Adicionar uma camada de cache nas consultas das url encurtadas

## Considerações <a name="consideracoes"></a>
Algumas considerações sobre a aplicação.

#### Design Patterns <a name="consideracoes-design-patterns"></a>
Foram utilizado principalmente dois design patterns:

##### Injeção de Controle com IoC 
Boa parte da aplicação está com IoC, fazendo com que facilite os testes e tenha uma manutenção mais facilitada.

Porém há algumas exceções:
 * Os controllers estão usando tipos não abstraídos vindo direto do express.js.
 * O arquivo principal `app.ts` usa diretamente libs e middlewares em sua implementação, quebrando parcialmente esse pattern.
 * Foram utilizadas classes abstratas ao invés de interfaces, devido a limitação do Typescript, já que interfaces só existem em build-time, e por escolha pessoal opitei por não utilizar Symbols para usar como Token DI, já que isso aumenta a complexidade do código e dificulta a manutenção.

##### Repository Pattern
Para conseguir uma fácil mudança de banco de dados ou até outros modelos de persistências, foi usado o Repository Pattern junto com DI e IoC para cumprir esse objetivo.


#### Testes <a name="consideracoes-testes"></a>
As implementações dos testes estão sendo feitas sem utilizar o DRY, justamente para melhorar a legibilidade dos testes, tornando algo mais imperativo (algo que considero ser importante para testes).

Os testes foram implementados em apenas alguns arquivos mais importantes, então o coverage até o momento está baixo.

Outro ponto é que há somente testes de unidades, faltando outros tipos de testes para complementar a qualidade.


#### Outros <a name="consideracoes-outros"></a>
Dependendo do modelo de negócio e perspectiva de crescimento (o que não está tratado nesta aplicação) é possível que esta esteja com over-engineering. Em um cenário mais simplista, talvez não haja a necessidade de inserir uma camada de infraestrutura e de Repository Pattern, mas isso é totalmente dependente do modelo real que precisa ser implementado. Mesmo sendo somente um Encurtador de URL, não é possível afirmar o modelo sem essa perspectiva bem claro.