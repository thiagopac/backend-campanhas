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

Copie ou renomeie arquivo .env.example para .env

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

### 6. Rodar testes funcionais e unitários

```bash

node  ace  test

```

### 7. Iniciar o servidor

```bash

node  ace  serve  --watch

```

### Documentação

Acesso ao Swagger da Aplicação através da URL:
http://localhost:3333/docs

Na raiz do projeto há um arquivo chamado "collection-insomnia-endpoints.json" com a coleção de endpoints para serem importados via Insomnia.

### Evidências de funcionamento

Insomnia Collection
<img width="1448" alt="image" src="https://github.com/thiagopac/backend-campanhas/assets/3586967/b698781d-8268-4742-8352-a6940d2ca050">

Acesso /docs para Swagger
<img width="1586" alt="image" src="https://github.com/thiagopac/backend-campanhas/assets/3586967/29aff2db-3161-4d30-ba51-f69c56425dbd">

Resultados de testes funcionais e unitários
<img width="1504" alt="image" src="https://github.com/thiagopac/backend-campanhas/assets/3586967/0e893cd4-24f1-4b25-bd2f-a918175a3de4">



