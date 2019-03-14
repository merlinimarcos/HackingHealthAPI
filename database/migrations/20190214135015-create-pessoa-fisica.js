'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PessoasFisicas', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Pessoas',
          key: 'id',
       }
      },
      dt_nasc: {
        type: Sequelize.DATE
      },
      sexo: {
        type: Sequelize.STRING
      },
      estado_civil: {
        type: Sequelize.STRING
      },
      interprete: {
        type: Sequelize.STRING
      },
      idioma: {
        type: Sequelize.STRING
      },
      responsavel: {
          allowNull: false,
          primaryKey: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Pessoas',
            key: 'id',
        }
      },
      reside_com: {
        allowNull: false,
          primaryKey: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Pessoas',
            key: 'id',
        }
      },
      renda_familiar: {
        type: Sequelize.DECIMAL(10, 2)
      },
      tipo_parto: {
        type: Sequelize.STRING
      },
      ano_mes_cadastro: {
        type: Sequelize.INTEGER
      },
      sequencia_ano_cadastro: {
        type: Sequelize.INTEGER
      },
      senha_consulta_solicitacao: {
        type: Sequelize.STRING
      },
      dt_ultima_consulta: {
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
    return queryInterface.dropTable('PessoasFisicas');
  }
};