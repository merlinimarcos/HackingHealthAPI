'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('StatusSolicitacao', [{
        descricao: 'Solicitado',
        id_perfil: 3,
        createdAt: '2019-01-01 00:00:00',
        updatedAt: '2019-01-01 00:00:00'
      }, {
          descricao: 'Triagem - Deferido',
          id_perfil: 4,
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
      }, {
          descricao: 'Triagem - Indeferido',
          id_perfil: 2,
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
        }, {
            descricao: 'Shriner Local - Em análise',
            id_perfil: 4,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }, {
            descricao: 'Shriner Local - Resolvido',
            id_perfil: 2,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }, {
            descricao: 'Shriner Local - Solicitado para regional',
            id_perfil: 5,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }, {
            descricao: 'Shriner Regional - Em análise',
            id_perfil: 5,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }, {
            descricao: 'Shriner Regional - Resolvido',
            id_perfil: 2,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }, {
            descricao: 'Shriner Reginal - Solicitado para nacional',
            id_perfil: 6,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        },{
            descricao: 'Shriner Nacional - Em análise',
            id_perfil: 6,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }, {
            descricao: 'Shriner Nacional - Resolvido',
            id_perfil: 2,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }    ], {});
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
