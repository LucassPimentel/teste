# Orders API

API RESTful para gerenciamento de pedidos, desenvolvida com Node.js, Express e SQLite.

## Disclaimer

Embora **Node.js não seja a stack com a qual trabalho diariamente**, minha experiência principal está na plataforma **.NET**, onde desenvolvo APIs e aplicações backend no meu dia a dia. Ainda assim, já tive contato prévio com **Node.js** em projetos acadêmicos e utilizei este desafio como uma oportunidade para revisitar e explorar novamente esse ecossistema.

Durante o desenvolvimento, utilizei **ferramentas de IA como apoio** para esclarecer detalhes específicos do ecossistema **Node.js/Express**. No entanto, as decisões relacionadas à **arquitetura em camadas**, **organização do projeto**, **validação de dados**, **tratamento de erros** e outras boas práticas aplicadas refletem princípios de engenharia de software que já utilizo rotineiramente no desenvolvimento com **.NET**.

Encarei este desafio como uma oportunidade de demonstrar **capacidade de adaptação, aprendizado rápido e aplicação consistente de boas práticas de engenharia**, independentemente da stack utilizada.

## Tecnologias e Libs

- [Node.js]
- [Express]
- [Better-SQLite3]
- [Zod] - Validação de dados
- [Swagger] - Documentação da API

## Arquitetura

A API segue uma arquitetura em 3 camadas:

| Camada         | Responsabilidade                         |
| -------------- | ---------------------------------------- |
| **Controller** | Recebe requests e retorna responses HTTP |
| **Service**    | Regras de negócio e validações           |
| **Repository** | Acesso e manipulação do banco de dados   |

Essa estruturação permite a divisão correta de responsabilidades, além de tornar a api mais
legível e manutenível.

## Decisões Técnicas

Algumas decisões foram tomadas para manter o projeto simples, porém organizado:

- Uso de Zod para validação de dados
- Separação clara entre camada HTTP e regra de negócio
- Tratamento centralizado de erros

# Como Executar o Projeto

```bash
# Clone o repositório
git clone https://github.com/LucassPimentel/teste.git

# Instale as dependências
npm install

# Modo desenvolvimento (com hot reload)
npm run dev

# Modo produção
npm start

# Acesse a documentação interativa via Swagger
http://localhost:3000/api-docs
```

## Trade-offs

Algumas decisões foram tomadas para manter o projeto simples dentro do tempo disponível:

- Não foi implementado sistema de autenticação
- O banco de dados foi simplificado
- Não foram adicionados testes automatizados
