'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Perfis', [{
        descricao: 'Admin',
        createdAt: '2019-01-01 00:00:00',
        updatedAt: '2019-01-01 00:00:00'
      }, {
          descricao: 'Solicitante',
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
        }, {
            descricao: 'Triagem',
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }, {
            descricao: 'Shriner Regional',
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }, {
            descricao: 'Comitê Comunitário Regional',
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }, 
        {
          descricao: 'SAR',
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
        }, {
          descricao: 'Comitê Comunitário Clube',
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
        }, {
          descricao: 'SAC',
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
      }, {
        descricao: 'Shriner Aprovador Templo',
        createdAt: '2019-01-01 00:00:00',
        updatedAt: '2019-01-01 00:00:00'
      }, {
        descricao: 'Comitê Comunitário Templo',
        createdAt: '2019-01-01 00:00:00',
        updatedAt: '2019-01-01 00:00:00'
      },
      {
        descricao: 'SAT',
        createdAt: '2019-01-01 00:00:00',
        updatedAt: '2019-01-01 00:00:00'
      },
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
