'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Usuarios', {
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
      login: {
        type: Sequelize.STRING
      },
      senha: {
        type: Sequelize.STRING
      },
      rede: {
          allowNull: false,
          primaryKey: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Redes',
            key: 'id',
        }
      },
      instituicao: {
        allowNull: false,
        primaryKey: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'PessoasJuridicas',
          key: 'id',
        }
      },
      data_ult_acesso: {
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
    return queryInterface.dropTable('Usuarios');
  }
};
