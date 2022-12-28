<h1 align="center">
    Challenge Backend<br>
</h1>

<h4 align="center">
  API que permite cadastro de restaurantes e verificação se o mesmo está aberto ou não.
</h4>

<p align="center">
  <a href="#rocket-technologies">Technologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#orange_book-documentação">Documentação da API</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## Tecnologias

Esse projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Nodejs](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Fastify](https://www.fastify.io/)
- [Postgres](https://www.postgresql.org/)
- [Knex](https://knexjs.org/)
- [Heroku](https://www.heroku.com/)
- [VS Code](https://code.visualstudio.com/) com [ESLint](https://eslint.org/)

## 💻 Instalação

```bash
# Faça o clone do repositório
$ git clone https://github.com/diegolemospadilha/restaurants-api.git

# Acesse o repositorio
$ cd restaurants-api

# Instale as dependências
$ npm install

# Inicialize o banco de dados com docker
$ docker-compose up -d postgres

# Rodar migrations do banco de dados
$ npm run knex:migrate:latest

# Rode o projeto
# Obs: Para que este comando funcione corretamente é necessário ter o postgres instalado e inicializado
$ npm run dev
```
## :orange_book: Documentação

A documentação pode ser [visualizada aqui](https://restaurants-api.herokuapp.com/docs/static/index.html)

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito ♥ by Diego Lemos Padilha :wave: [Entre em contato!](https://www.linkedin.com/in/diegolemospadilha/)
