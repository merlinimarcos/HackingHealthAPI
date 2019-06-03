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
      login: "triagem1",
			senha: "$2b$10$Vz6nqxQwHk91uWTPC7O2Ou/vk3sLBoIA1YTEFBi7MKBPHrBCw4Ewu",//2JVJ2bR2
			id_rede: 1,
			id_instituicao: 1,
      createdAt: '2019-01-01 00:00:00',
      updatedAt: '2019-01-01 00:00:00'
		},  {
      id: 6,
      login: "shriner_regional1",
			senha: "$2b$10$Vz6nqxQwHk91uWTPC7O2Ou/vk3sLBoIA1YTEFBi7MKBPHrBCw4Ewu",//2JVJ2bR2
			id_rede: 1,
			id_instituicao: 1,
      createdAt: '2019-01-01 00:00:00',
      updatedAt: '2019-01-01 00:00:00'
		}, {
      id: 7,
      login: "comite_comunitario_regional",
			senha: "$2b$10$Vz6nqxQwHk91uWTPC7O2Ou/vk3sLBoIA1YTEFBi7MKBPHrBCw4Ewu",//2JVJ2bR2
			id_rede: 1,
			id_instituicao: 1,
      createdAt: '2019-01-01 00:00:00',
      updatedAt: '2019-01-01 00:00:00'
    }, 
    {
      id: 8,
      login: "sar",
			senha: "$2b$10$Vz6nqxQwHk91uWTPC7O2Ou/vk3sLBoIA1YTEFBi7MKBPHrBCw4Ewu",//2JVJ2bR2
			id_rede: 1,
			id_instituicao: 1,
      createdAt: '2019-01-01 00:00:00',
      updatedAt: '2019-01-01 00:00:00'
    },
    {
      id: 9,
      login: "comite_comunitario_clube",
			senha: "$2b$10$Vz6nqxQwHk91uWTPC7O2Ou/vk3sLBoIA1YTEFBi7MKBPHrBCw4Ewu",//2JVJ2bR2
			id_rede: 1,
			id_instituicao: 1,
      createdAt: '2019-01-01 00:00:00',
      updatedAt: '2019-01-01 00:00:00'
    }, {
      id: 10,
      login: "sac",
			senha: "$2b$10$Vz6nqxQwHk91uWTPC7O2Ou/vk3sLBoIA1YTEFBi7MKBPHrBCw4Ewu",//2JVJ2bR2
			id_rede: 1,
			id_instituicao: 1,
      createdAt: '2019-01-01 00:00:00',
      updatedAt: '2019-01-01 00:00:00'
    }, {
      id: 11,
      login: "shriner_aprovador_templo",
			senha: "$2b$10$Vz6nqxQwHk91uWTPC7O2Ou/vk3sLBoIA1YTEFBi7MKBPHrBCw4Ewu",//2JVJ2bR2
			id_rede: 1,
			id_instituicao: 1,
      createdAt: '2019-01-01 00:00:00',
      updatedAt: '2019-01-01 00:00:00'
    }, {
      id: 12,
      login: "comite_comunitario_templo",
			senha: "$2b$10$Vz6nqxQwHk91uWTPC7O2Ou/vk3sLBoIA1YTEFBi7MKBPHrBCw4Ewu",//2JVJ2bR2
			id_rede: 1,
			id_instituicao: 1,
      createdAt: '2019-01-01 00:00:00',
      updatedAt: '2019-01-01 00:00:00'
    }, {
      id: 13,
      login: "sat",
			senha: "$2b$10$Vz6nqxQwHk91uWTPC7O2Ou/vk3sLBoIA1YTEFBi7MKBPHrBCw4Ewu",//2JVJ2bR2
			id_rede: 1,
			id_instituicao: 1,
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
