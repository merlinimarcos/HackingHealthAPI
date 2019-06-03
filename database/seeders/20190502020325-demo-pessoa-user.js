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
			telefone: "(49) 3333-3334",
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
			telefone: "(49) 3333-3335",
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
			telefone: "(49) 3333-3336",
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
			telefone: "(49) 3333-3337",
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
    }, {
    		  nome: "Shriner Regional",
    	    endereco: "-",
    	    email: "shriner1@teste.com.br",
    	    cep: "89809-999",
    	    cidade: 555,
    	    bairro: "Efapi",
    	    rua: "A",
    	    estado_civil: "-",
    	    end_numero: "8989",
			end_complemento: "Casa",
			telefone: "(49) 3333-3338",
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
    }, {
    		  nome: "Comite comunitário regional",
    	    endereco: "-",
    	    email: "comite_comunitario_regional@teste.com.br",
    	    cep: "89809-999",
    	    cidade: 555,
    	    bairro: "Efapi",
    	    rua: "A",
    	    estado_civil: "-",
    	    end_numero: "8989",
			end_complemento: "Casa",
			telefone: "(49) 3333-3339",
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
    }, {
    		  nome: "SAR",
    	    endereco: "-",
    	    email: "sar@gmail.com",
    	    cep: "89809-999",
    	    cidade: 555,
    	    bairro: "Efapi",
    	    rua: "A",
    	    estado_civil: "-",
    	    end_numero: "8989",
			end_complemento: "Casa",
			telefone: "(49) 3333-3340",
          createdAt: '2019-01-01 00:00:00',
          updatedAt: '2019-01-01 00:00:00'
    }, {
			nome: "Comite Comunitario Clube",
			endereco: "-",
			email: "comite_comunitario_clube@gmail.com",
			cep: "89809-999",
			cidade: 555,
			bairro: "Efapi",
			rua: "A",
			estado_civil: "-",
			end_numero: "8989",
			end_complemento: "Casa",
			telefone: "(49) 3333-3340",
			createdAt: '2019-01-01 00:00:00',
			updatedAt: '2019-01-01 00:00:00'
	}, {
		nome: "SAC",
		endereco: "-",
		email: "sac@gmail.com",
		cep: "89809-999",
		cidade: 555,
		bairro: "Efapi",
		rua: "A",
		estado_civil: "-",
		end_numero: "8989",
		end_complemento: "Casa",
		telefone: "(49) 3333-3340",
		createdAt: '2019-01-01 00:00:00',
		updatedAt: '2019-01-01 00:00:00'
}, {
		nome: "Shriner aprovador templo",
		endereco: "-",
		email: "shriner_aprovador_templo@gmail.com",
		cep: "89809-999",
		cidade: 555,
		bairro: "Efapi",
		rua: "A",
		estado_civil: "-",
		end_numero: "8989",
		end_complemento: "Casa",
		telefone: "(49) 3333-3340",
		createdAt: '2019-01-01 00:00:00',
		updatedAt: '2019-01-01 00:00:00'
	}, {
		nome: "Comite comunitário templo",
		endereco: "-",
		email: "comite_comunitario_templo@gmail.com",
		cep: "89809-999",
		cidade: 555,
		bairro: "Efapi",
		rua: "A",
		estado_civil: "-",
		end_numero: "8989",
		end_complemento: "Casa",
		telefone: "(49) 3333-3340",
		createdAt: '2019-01-01 00:00:00',
		updatedAt: '2019-01-01 00:00:00'
		}, {
			nome: "Sat",
			endereco: "-",
			email: "sat@gmail.com",
			cep: "89809-999",
			cidade: 555,
			bairro: "Efapi",
			rua: "A",
			estado_civil: "-",
			end_numero: "8989",
			end_complemento: "Casa",
			telefone: "(49) 3333-3340",
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
