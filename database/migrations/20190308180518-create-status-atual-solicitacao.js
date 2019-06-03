'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StatusAtualSolicitacao', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_solicitacao: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Solicitacoes',
          key: 'id',
       }
      },
      id_status: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'StatusSolicitacao',
          key: 'id',
       }
      },
      id_usuario: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id',
       }
      },
      feedback: {
        type: Sequelize.STRING
      },
      data_status: {
        type: Sequelize.DATE
      },
      concluido: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      email_shriner_aprovador_regional: {
        type: Sequelize.STRING,
        allowNull: true
      },
      id_usuario_reivindicacao: {
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios',
          key: 'id',
       }
      },
      id_comite_comunitario_regional: {
        allowNull: true,
        autoIncrement: false,
        primaryKey: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'ComiteComunitarioRegional',
          key: 'id',
       }
      },
      aprovar_requisicao: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      requisicao_atendida_localmente: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      existe_estimativa_de_valor: {
        type: Sequelize.STRING,
        allowNull: true
      },
      encaminhar_clube: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      encaminhar_templo: {
        type: Sequelize.INTEGER,
        allowNull: true
      },              
      requisicao_atendida_clube: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      caso_envio_eua: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      encaminhar_eua: {
        type: Sequelize.INTEGER,
        allowNull: true
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
    return queryInterface.dropTable('StatusAtualSolicitacao');
  }
};