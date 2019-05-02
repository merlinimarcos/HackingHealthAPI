'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pessoas', [{
		  nome: "Hospital teste",
	    endereco: "Hospital teste",
	    email: "hospital_teste@teste.com",
	    cep: "89809-999",
	    cidade: 555,
	    bairro: "Centro",
	    rua: "A",
	    estado_civil: "-",
	    end_numero: "8989",
	    end_complemento: "Casa",
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
