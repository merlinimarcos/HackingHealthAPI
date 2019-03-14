'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pessoas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      endereco: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      cep: {
        type: Sequelize.STRING
      },
      cidade: {
        type: Sequelize.INTEGER
      },
      bairro: {
        type: Sequelize.STRING
      },
      rua: {
        type: Sequelize.STRING
      },
      estado_civil: {
        type: Sequelize.STRING
      },
      end_numero: {
        type: Sequelize.INTEGER
      },
      end_complemento: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pessoas');
  }
};
