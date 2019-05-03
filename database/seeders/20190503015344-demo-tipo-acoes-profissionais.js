'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TiposDeAcaoProfissional', [{
      descricao_tipo_acao: "Capacitação",
      createdAt: '2019-01-01 00:00:00',
      updatedAt: '2019-01-01 00:00:00'
    }, {
      descricao_tipo_acao: "Atendimento",
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
