'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Solicitacoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_usuario: {
        allowNull: false,
        primaryKey: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id',
        }
      },
      tipo_solicitacao: {
          allowNull: false,
          primaryKey: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'TiposSolicitacoes',
            key: 'id',
        }
      },
      descricao: {
        type: Sequelize.STRING
      },
      dt_solicitacao: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('Solicitacoes');
  }
};