'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('StatusSolicitacao', [{
          descricao: 'Em entendimento da solicitação',
          id_perfil: 3,
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
      }, {
          descricao: 'Em Aprovação Shriner Regional',
          id_perfil: 4,
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
        }, {
            descricao: 'Comitê Comunitário Regional',
            id_perfil: 5,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }, {
            descricao: 'Parecer CCR em Análise SAR',
            id_perfil: 6,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }, {
            descricao: 'Em Análise Comitê Comunitário Clube',
            id_perfil: 7,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }, {
            descricao: 'Parecer CCC em Análise SAC',
            id_perfil: 8,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }, {
            descricao: 'Em Análise Shriner Aprovador Templo',
            id_perfil: 9,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }, {
            descricao: 'Em Análise Comitê Comunitário Templo',
            id_perfil: 10,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        },{
            descricao: 'Parecer CCT em Análise SAT',
            id_perfil: 11,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }, {
          descricao: 'Concluído',
          id_perfil: 11,
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
