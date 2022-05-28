# API Rest - Extratos Bancários

API construída no padrão Rest, em Node.JS, simulando um Banco Digital. Foram implementadas as seguintes funcionalidades:

-   Criar conta bancária
-   Listar contas bancárias
-   Atualizar os dados do usuário da conta bancária
-   Excluir uma conta bancária
-   Depósitar em uma conta bancária
-   Sacar de uma conta bancária
-   Transferir valores entre contas bancárias
-   Consultar saldo da conta bancária
-   Emitir extrato bancário

Além destas implementações, sempre que ocorre falha na validação de uma requisição é retornada uma mensagem de erro para o usuário.

**Exemplo:**

```javascript
// Quando é informado um número de conta que não existe:
// HTTP Status 404
{
    "mensagem": "Conta bancária não encontada!"
}
```

Este projeto foi desenvolvido como pré requisito para conclusão do 2º módulo do Curso de Desenvolvimento de Software da Cubos Academy, onde foram abordados conceitos sobre:

### - Servidores;
### - Rotas Intermediários e Controladores;
### - API Rest;
### - Programação Assíncrona;
### - Date-fns;
### - Express;

Para interagir com este projeto, será necessária a instalação das dependências do projeto, a saber:

### - Express;
### - Date-fns;
### - Nodemon;

Para isso, invoque o comando "npm install".

Também será necessária a instalação de uma plataforma API para facilitar as chamadas de cada endpoint. Algumas opções são:

### - Postman;
### - Insomnia;

![](https://i.ibb.co/4VYQnw9/Captura-de-tela-2022-05-28-03-38-20.png)

A porta utilizada neste projeto é a 3000.

```javascript
http://localhost:3000
```

## Endpoints

### Listar contas bancárias

#### `GET` `/contas?senha_banco=Cubos123Bank`

Esse endpoint deverá listar todas as contas bancárias existentes.

-   **Requisição** - query params (respeitando este nome)

    -   senha_banco

-   **Resposta**
    -   listagem de todas as contas bancárias existentes

#### Exemplo de resposta

```javascript
// HTTP Status 200 / 201 / 204
// 2 contas encontradas
[
    {
        "numero": "1",
        "saldo": 0,
        "usuario": {
            "nome": "Foo Bar",
            "cpf": "00011122233",
            "data_nascimento": "2021-03-15",
            "telefone": "71999998888",
            "email": "foo@bar.com",
            "senha": "1234"
        }
    },
    {
        "numero": "2",
        "saldo": 1000,
        "usuario": {
            "nome": "Foo Bar 2",
            "cpf": "00011122234",
            "data_nascimento": "2021-03-15",
            "telefone": "71999998888",
            "email": "foo@bar2.com",
            "senha": "12345"
        }
    }
]
```

### Criar conta bancária

#### `POST` `/contas`

Esse endpoint deverá criar uma conta bancária, onde será gerado um número único para identificação da conta (número da conta).

-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   cpf
    -   data_nascimento
    -   telefone
    -   email
    -   senha

#### Exemplo de Requisição

```javascript
// POST /contas
{
    "nome": "Foo Bar 2",
    "cpf": "00011122234",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "foo@bar2.com",
    "senha": "12345"
}
```

#### Exemplo de Resposta

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```
```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Já existe uma conta com o cpf ou e-mail informado!"
}
```

### Atualizar usuário da conta bancária

#### `PUT` `/contas/:numeroConta/usuario`

Esse endpoint deverá atualizar os dados do usuário de uma conta bancária.

-   **Requisição** - O corpo (body) deverá possuir um objeto com todas as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   cpf
    -   data_nascimento
    -   telefone
    -   email
    -   senha

- query params

Informar o número da conta bancária, sempre com um total de 6 dígitos.

    -   Ex: /contas/000001/usuario

#### Exemplo de Requisição
```javascript
// PUT /contas/:numeroConta/usuario
{
    "nome": "Foo Bar 3",
    "cpf": "99911122234",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "foo@bar3.com",
    "senha": "12345"
{
```


#### Exemplo de Resposta

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```
```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O CPF informado já existe cadastrado!"
}
```

### Excluir Conta

#### `DELETE` `/contas/:numeroConta`

Esse endpoint deve excluir uma conta bancária existente.

-   **Requisição**

    -   Numero da conta bancária (passado como parâmetro na rota). (Ex: /contas/000001)

#### Exemplo de Resposta

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```
```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "A conta só pode ser removida se o saldo for zero!"
}
```

### Depositar

#### `POST` `/transacoes/depositar`

Esse endpoint deverá somar o valor do depósito (EM CENTAVOS) ao saldo de uma conta válida e registrar essa transação.

-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta
    -   valor

#### Exemplo de Requisição
```javascript
// POST /transacoes/depositar
{
	"numero_conta": "000001",
	"valor": 1900
}
```

#### Exemplo de Resposta

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```
```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O número da conta e o valor são obrigatórios!"
}
```

### Sacar

#### `POST` `/transacoes/sacar`

Esse endpoint deverá realizar o saque de um valor em uma determinada conta bancária e registrar essa transação.

-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta
    -   valor
    -   senha

#### Exemplo de Requisição
```javascript
// POST /transacoes/sacar
{
	"numero_conta": "000001",
	"valor": 1900,
    "senha": "123456"
}
```
#### Exemplo de Resposta
```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```
```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O valor não pode ser menor que zero!"
}
```

### Tranferir

#### `POST` `/transacoes/transferir`

Esse endpoint deverá permitir a transferência de recursos (dinheiro) de uma conta bancária para outra e registrar essa transação.

-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta_origem
    -   numero_conta_destino
    -   valor
    -   senha

#### Exemplo de Requisição
```javascript
// POST /transacoes/transferir
{
	"numero_conta_origem": "000001",
	"numero_conta_destino": "000002",
	"valor": 200,
	"senha": "123456"
}
```
#### Exemplo de Resposta

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```
```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Saldo insuficiente!"
}
```

### Saldo

#### `GET` `/contas/saldo?numero_conta=123&senha=123`

Esse endpoint deverá retornar o saldo de uma conta bancária.

-   **Requisição** - query params

    -   numero_conta
    -   senha

#### Exemplo de Resposta

```javascript
// HTTP Status 200 / 201 / 204
{
    "saldo": 13000
}
```
```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Conta bancária não encontada!"
}
```

### Extrato

#### `GET` `/contas/extrato?numero_conta=123&senha=123`

Esse endpoint deverá listar as transações realizadas de uma conta específica.

-   **Requisição** - query params

    -   numero_conta
    -   senha

#### Exemplo de Resposta

```javascript
// HTTP Status 200 / 201 / 204
{
  "depositos": [
    {
      "data": "2021-08-18 20:46:03",
      "numero_conta": "000001",
      "valor": 10000
    },
    {
      "data": "2021-08-18 20:46:06",
      "numero_conta": "000001",
      "valor": 10000
    }
  ],
  "saques": [
    {
      "data": "2021-08-18 20:46:18",
      "numero_conta": "000001",
      "valor": 1000
    }
  ],
  "transferenciasEnviadas": [
    {
      "data": "2021-08-18 20:47:10",
      "numero_conta_origem": "000001",
      "numero_conta_destino": "000002",
      "valor": 5000
    }
  ],
  "transferenciasRecebidas": [
    {
      "data": "2021-08-18 20:47:24",
      "numero_conta_origem": "000002",
      "numero_conta_destino": "000001",
      "valor": 2000
    },
    {
      "data": "2021-08-18 20:47:26",
      "numero_conta_origem": "000002",
      "numero_conta_destino": "000001",
      "valor": 2000
    }
  ]
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Conta bancária não encontada!"
}
```

