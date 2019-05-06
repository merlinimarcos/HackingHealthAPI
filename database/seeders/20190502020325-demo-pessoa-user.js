'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pessoas', [{
    		  nome: "Admin",
    	    endereco: "-",
    	    email: "cezar08@unochapeco.edu.br",
    	    cep: "89809-999",
    	    cidade: 555,
    	    bairro: "Efapi",
    	    rua: "A",
    	    estado_civil: "-",
    	    end_numero: "8989",
    	    end_complemento: "Casa",
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
    }, {
    		  nome: "Solicitante 1",
    	    endereco: "-",
    	    email: "solicitante1@teste.com.br",
    	    cep: "89809-999",
    	    cidade: 555,
    	    bairro: "Efapi",
    	    rua: "A",
    	    estado_civil: "-",
    	    end_numero: "8989",
    	    end_complemento: "Casa",
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
    }, {
    		  nome: "Solicitante 2",
    	    endereco: "-",
    	    email: "solicitante2@teste.com.br",
    	    cep: "89809-999",
    	    cidade: 555,
    	    bairro: "Efapi",
    	    rua: "A",
    	    estado_civil: "-",
    	    end_numero: "8989",
    	    end_complemento: "Casa",
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
    }, {
    		  nome: "Triagem",
    	    endereco: "-",
    	    email: "triagem@teste.com.br",
    	    cep: "89809-999",
    	    cidade: 555,
    	    bairro: "Efapi",
    	    rua: "A",
    	    estado_civil: "-",
    	    end_numero: "8989",
    	    end_complemento: "Casa",
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
    }, {
    		  nome: "Shriner Local 1",
    	    endereco: "-",
    	    email: "shriner1@teste.com.br",
    	    cep: "89809-999",
    	    cidade: 555,
    	    bairro: "Efapi",
    	    rua: "A",
    	    estado_civil: "-",
    	    end_numero: "8989",
    	    end_complemento: "Casa",
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
    }, {
    		  nome: "Shriner Local 2",
    	    endereco: "-",
    	    email: "shriner2@teste.com.br",
    	    cep: "89809-999",
    	    cidade: 555,
    	    bairro: "Efapi",
    	    rua: "A",
    	    estado_civil: "-",
    	    end_numero: "8989",
    	    end_complemento: "Casa",
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
    }, {
    		  nome: "Shriner Regional",
    	    endereco: "-",
    	    email: "shriner_regional@teste.com.br",
    	    cep: "89809-999",
    	    cidade: 555,
    	    bairro: "Efapi",
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
