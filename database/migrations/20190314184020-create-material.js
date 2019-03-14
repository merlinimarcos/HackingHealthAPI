'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Materiais', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_grupo: {
        allowNull: false,
          primaryKey: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'GruposMateriais',
            key: 'id',
        }
      },
      id_unidade: {
        allowNull: false,
          primaryKey: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'UnidadeMateriais',
            key: 'id',
        }
      },
      descricao_material: {
        type: Sequelize.STRING
      },
      valor: {
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
    return queryInterface.dropTable('Materiais');
  }
};