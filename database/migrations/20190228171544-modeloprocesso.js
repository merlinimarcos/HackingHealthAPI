'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ModeloProcessos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      xml_camunda: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      data_criacao: {
        allowNull: false,
        type: Sequelize.DATE,
      }, 
      data_validade: {
        allowNull: false,
        type: Sequelize.DATE,
      }, 
      habilitado: {
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
    return queryInterface.dropTable('ModeloProcessos');
  }
};
