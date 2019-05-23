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
      outra_especialidade: { 
        type: Sequelize.TEXT
      },
      outra_acao: {
        type: Sequelize.TEXT
      },    
      data_inicial_periodo_necessidade: {
        type: Sequelize.DATE
      },
      data_final_periodo_necessidade: {
        type: Sequelize.DATE
      },
      custo_estimado: {
        type: Sequelize.DECIMAL(10, 2)
      },
      justificativa_valor: {
        type: Sequelize.TEXT
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