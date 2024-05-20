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


  
- **Entity:** Contém a criação da entidade do banco de dados.
  


- **Repository:** Contém as querys relacionadas a tabela criada para o projeto.
  

- **Routes:** Contém a definição de todas as rotas estabelecidas para o projeto.


- **Scripts:** Contém o script que inicia o server do projeto e a conexão com o banco de dados.
- **Service:** Contém o service auxiliar para a conexão com o banco de dados.
