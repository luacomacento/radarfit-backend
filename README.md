
# RadarFit - Missão backend

Projeto desenvolvido para desafio técnico da RadarFit,
cujo objetivo era criar uma **API JSON Restful** em **Node**,
que utilizasse os métodos ``GET``, ``POST``, ``PUT``, ``PATCH`` e ``DELETE``.

Como bônus, foram desenvolvidos também testes unitários para as camadas de
``controllers``, ``services`` e ``middlewares`` (com exceção dos middlewares de validação).


## Deploy

O deploy do projeto foi feito através do Railway.app, com um banco de dados Postgres integrado.

Ele pode ser acessado através [deste link](https://radarfit-back.up.railway.app/).
## Documentação da API

#### Retorna todos os itens

```http
  GET /produtos
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna itens baseados em filtragem por nome

```http
  GET /produtos/find/?q=
```

| Query   | Descrição                           |
| :----------  | :---------------------------------- |
| `?q=`  | Opcional. Termo para busca |

#### Retorna um item

```http
  GET /produtos/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Adiciona um novo item

```http
  POST /produtos
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `produto`      | `string` | **Obrigatório**. O nome do item |
| `valor`      | `number` | **Obrigatório**. O valor do item em reais (R$) |
| `descricao`      | `string` | **Obrigatório**. A descrição do item |

#### Altera um item por completo

```http
  PUT /produtos/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item a ser alterado |
| `produto`      | `string` | **Obrigatório**. O novo nome para o item |
| `valor`      | `number` | **Obrigatório**. O novo valor para o item em reais (R$) |
| `descricao`      | `string` | **Obrigatório**. A nova descrição para o item |

#### Altera partes de um item

```http
  PATCH /produtos/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item a ser alterado |
| `produto`      | `string` | Opcional. O novo nome para o item |
| `valor`      | `number` | Opcional. O novo valor para o item em reais (R$) |
| `descricao`      | `string` | Opcional. A nova descrição para o item |

#### Deleta um item

```http
  DELETE /produtos/{id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item a ser excluído |

## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:luacomacento/radarfit-backend.git
```

Entre no diretório do projeto

```bash
  cd radarfit-backend
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm start
```


## Variáveis de Ambiente

Para rodar esse projeto,
você vai precisar adicionar as seguintes variáveis de ambiente no seu ``.env``:

`PGUSER`: usuário do Postgres

`PGPASSWORD`: senha do Postgres

`PGDATABASE`: nome do banco de dados

`PGHOST`: host do banco de dados

`PGPORT`: porta do banco de dados

`PORT`: porta para rodar a API
## Rodando os testes

Para rodar todos os testes:

```bash
  npm run test
```

Para verificar a cobertura de testes:

```bash
  npm run test:coverage
```

## Autores

- [@luacomacento](https://www.github.com/luacomacento)

