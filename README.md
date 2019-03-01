# HackingHealthAPI

Projeto do serviço backend para a aplicação de gestão das solicitações atendidas pelos Shriners Santa Catarina.

# Ambiente
Windows
- Gerar o banco de dados
.\node_modules\.bin\sequelize db:migrate
- Executar a aplicação
npm install
npm start

# Desenvolvimento
- Criar um novo migration
.\node_modules\.bin\sequelize migration:generate --name nome_nova_entidade

# Documentação da API (Swagger)
- http://localhost:3000/api-docs/