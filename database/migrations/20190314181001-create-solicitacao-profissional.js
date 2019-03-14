'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SolicitacaoProfissional', {
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
      id_tipo_acao: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'TiposDeAcaoProfissional',
          key: 'id',
       }
      },
      id_especialidade: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'EspecialidadesProfissional',
          key: 'id',
       }
      },
      outra_especialidade: {
        type: Sequelize.STRING
      },
      outra_acao: {
        type: Sequelize.STRING
      },
      dt_necessidade: {
        type: Sequelize.DATE
      },
      custo_estimado: {
        type: Sequelize.DECIMAL(10, 2)
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
    return queryInterface.dropTable('SolicitacaoProfissional');
  }
};