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
		}, {
      id: 3,
      login: "solicitante1",
			senha: "$2b$10$Vz6nqxQwHk91uWTPC7O2Ou/vk3sLBoIA1YTEFBi7MKBPHrBCw4Ewu",//2JVJ2bR2
			id_rede: 1,
			id_instituicao: 1,
      createdAt: '2019-01-01 00:00:00',
      updatedAt: '2019-01-01 00:00:00'
		}, {
      id: 4,
      login: "solicitante2",
			senha: "$2b$10$Vz6nqxQwHk91uWTPC7O2Ou/vk3sLBoIA1YTEFBi7MKBPHrBCw4Ewu",//2JVJ2bR2
			id_rede: 1,
			id_instituicao: 1,
      createdAt: '2019-01-01 00:00:00',
      updatedAt: '2019-01-01 00:00:00'
		}, {
      id: 5,
      login: "triagem",
			senha: "$2b$10$Vz6nqxQwHk91uWTPC7O2Ou/vk3sLBoIA1YTEFBi7MKBPHrBCw4Ewu",//2JVJ2bR2
			id_rede: 1,
			id_instituicao: 1,
      createdAt: '2019-01-01 00:00:00',
      updatedAt: '2019-01-01 00:00:00'
		}, {
      id: 6,
      login: "shriner_local1",
			senha: "$2b$10$Vz6nqxQwHk91uWTPC7O2Ou/vk3sLBoIA1YTEFBi7MKBPHrBCw4Ewu",//2JVJ2bR2
			id_rede: 1,
			id_instituicao: 1,
      createdAt: '2019-01-01 00:00:00',
      updatedAt: '2019-01-01 00:00:00'
		}, {
      id: 7,
      login: "shriner_local2",
			senha: "$2b$10$Vz6nqxQwHk91uWTPC7O2Ou/vk3sLBoIA1YTEFBi7MKBPHrBCw4Ewu",//2JVJ2bR2
			id_rede: 1,
			id_instituicao: 1,
      createdAt: '2019-01-01 00:00:00',
      updatedAt: '2019-01-01 00:00:00'
		}, {
      id: 8,
      login: "shriner_regional1",
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
