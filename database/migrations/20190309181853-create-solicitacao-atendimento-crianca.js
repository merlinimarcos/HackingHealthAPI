'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SolicitacaoAtendimentoCriancas', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Solicitacoes',
          key: 'id',
       }
      },
      id_pessoa: {
        allowNull: false,
          primaryKey: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Pessoas',
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
    return queryInterface.dropTable('SolicitacaoAtendimentoCriancas');
  }
};