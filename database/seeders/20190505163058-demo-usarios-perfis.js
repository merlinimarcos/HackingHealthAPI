'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UsuariosPerfis', [{
        id_usuario: 2,
        id_perfil: 1,
        createdAt: '2019-01-01 00:00:00',
        updatedAt: '2019-01-01 00:00:00'
      }, {
          id_usuario: 3,
          id_perfil: 2,
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
        }, {
            id_usuario: 4,
            id_perfil: 2,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }, {
            id_usuario: 5,
            id_perfil: 3,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }, {
            id_usuario: 6,
            id_perfil: 4,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }, {
            id_usuario: 7,
            id_perfil: 5,
            createdAt: '2019-01-01 00:00:00',
            updatedAt: '2019-01-01 00:00:00'
        }, {
          id_usuario: 8,
          id_perfil: 6,
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
      }, {
        id_usuario: 9,
        id_perfil: 7,
        createdAt: '2019-01-01 00:00:00',
        updatedAt: '2019-01-01 00:00:00'
      }, {
        id_usuario: 10,
        id_perfil: 8,
        createdAt: '2019-01-01 00:00:00',
        updatedAt: '2019-01-01 00:00:00'
    }, {
      id_usuario: 11,
      id_perfil: 9,
      createdAt: '2019-01-01 00:00:00',
      updatedAt: '2019-01-01 00:00:00'
    }, {
      id_usuario: 12,
      id_perfil: 10,
      createdAt: '2019-01-01 00:00:00',
      updatedAt: '2019-01-01 00:00:00'
    }, {
      id_usuario: 13,
      id_perfil: 11,
      createdAt: '2019-01-01 00:00:00',
      updatedAt: '2019-01-01 00:00:00'
    }], {});
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
