# Projeto para vertical da logística
Esse projeto foi desenvolvido com objetivo de cumprir com o desafio proposto pelo time da vertical de logística.

### Tecnologias
- node
- mongoDB
- Typescript

### Dependências 
- mongoose: ^7.6.3
- ts-node: ^10.9.1
- typescript: ^5.2.2
- @nestjs/platform-express: ^10.0.0
- @nestjs/cli: ^10.0.0

### Instalação 
- **1.** npm install

### Para rodar o projeto
- **1.** npm run dev
  
### Para rodar o teste do projeto
- **1.** npm run test

### Para rodar o lint do projeto
- **1.** npm run lint
  
### Sobre as rotas estabelecidas
- **1.** GET - /purchases/ **(Lista todos os pedidos)**
- **2.** GET - /purchases/orders/{orderId} **(Lista o pedido do código fornecido)**
- **3.** GET - /purchases/orders/{beginDate}/{endDate} **(Lista os pedidos das datas fornecidas)**
- **4.** POST - /purchases/ **(Inclui os itens do arquivo que foi passado pelo body)**


## Sobre a estrutura do projeto
![image](https://github.com/karolineguckert/luizalabs-vertical-logistica/assets/60297870/27b7bfa4-c02e-4e4f-acb4-4f8149102b2f)


- **Business:** Contém as manipulações das regras de negócio e interação com o banco de dados.
  ![image](https://github.com/karolineguckert/luizalabs-vertical-logistica/assets/60297870/57164d34-2755-4c18-a087-562dabab7d55)

  
- **DTO:** Contém os objetos auxiliares criados para as manipulações no projeto.

  ![image](https://github.com/karolineguckert/luizalabs-vertical-logistica/assets/60297870/c48109e1-1277-4eca-8e2b-457749404865)

  
- **Entity:** Contém a criação da entidade do banco de dados.

  ![image](https://github.com/karolineguckert/luizalabs-vertical-logistica/assets/60297870/82bbf6af-e3da-4259-8ce3-9b462e2eccb2)

- **Repository:** Contém as querys relacionadas a tabela criada para o projeto.
  
  ![image](https://github.com/karolineguckert/luizalabs-vertical-logistica/assets/60297870/470e929d-f784-475c-94b7-b32397f16ed5)


- **Controller:** Contém a definição de todas as rotas estabelecidas para o projeto.
  
  ![image](https://github.com/karolineguckert/luizalabs-vertical-logistica/assets/60297870/7c86ca04-a1c1-4914-bd07-01702609597c)


- **Config e main:** Contém o iniciamento do server do projeto e a conexão com o banco de dados.

