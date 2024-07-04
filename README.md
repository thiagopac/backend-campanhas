# Backend Campanhas

## Descrição

Backend Campanhas é um projeto desenvolvido em AdonisJS para gerenciar campanhas, permitindo criar, atualizar, listar e deletar campanhas.

## Pré-requisitos

- Node.js (v14 ou superior)

- NPM ou Yarn

## Instalação

### 1. Clonar o repositório

```bash

git  clone  git@github.com:thiagopac/backend-campanhas.git

cd  backend-campanhas

```

### 2. Instalar as dependências

Usando NPM

```bash

npm  install

```

Usando Yarn

```bash

yarn  install

```

### 3. Configurar o arquivo .env

Copie o arquivo .env.example para .env e ajuste as configurações

```bash

cp  .env.example  .env

```

### 4. Inicializar o Docker

```bash
docker-compose up -d
```

### 5. Rodar as migrations

```bash

node  ace  migration:run

```

### 6. Iniciar o servidor

```bash

node  ace  serve  --watch

```

### Documentação

Acesso ao Swagger da Aplicação através da URL:
http://localhost:3333/docs

Na raiz do projeto há um arquivo chamado "collection-insomnia-endpoints.json" com a coleção de endpoints para serem importados via Insomnia.
