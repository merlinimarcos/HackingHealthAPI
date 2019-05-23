'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SolicitacaoProfissionalAcoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_solicitacao: {
        allowNull: false,
        primaryKey: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'SolicitacaoProfissional',
          key: 'id',
        }
      },
      id_acao: {
        allowNull: false,
        primaryKey: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'TiposDeAcaoProfissional',
          key: 'id',
        }
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
    return queryInterface.dropTable('SolicitacaoProfissionalAcoes');
  }
};