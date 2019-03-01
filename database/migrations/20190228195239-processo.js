'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Processos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      ModeloProcessoId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'ModeloProcessos',
          key: 'id',
        }
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      json_instancia_processo: {
        allowNull: false,
        type: Sequelize.JSON,
      },
      data_criacao: {
        allowNull: false,
        type: Sequelize.DATE,
      }, 
      finalizado: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('Processos');
  }
};
