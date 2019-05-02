'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Usuarios', [{
      id: 2,
      login: "admin",
			senha: "$2b$10$Vz6nqxQwHk91uWTPC7O2Ou/vk3sLBoIA1YTEFBi7MKBPHrBCw4Ewu",//2JVJ2bR2
			id_rede: 1,
			id_instituicao: 1,
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
