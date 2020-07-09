const chai     = require('chai');
const expect   = chai.expect;
const should   = require('should');
const chaiHttp = require('chai-http');
const faker    = require("faker");

chai.use(chaiHttp);

const userCredentials = {
  login: 'admin',
  senha: '2JVJ2bR2'
}

describe('UsuariosController', () => {
  beforeEach(done => {
    chai.request('http://127.0.0.1:8080')
      .post('/login')
      .send(userCredentials)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.auth).to.equal(true);
        expect(res.body).to.have.property('token');
        
        token = res.body.token;

        done();
      });
  });

  // describe('POST', () => {
  //   it('Cadastra um usuário com sucesso.', (done) => {
  //     let usuario = {
  //       id: 99,
  //       login: 'ricardoteste',
  //       senha: '2JVJ2bR2',
  //       id_rede: 1,
  //       id_instituicao: 1,
  //     }
  //     chai.request('http://127.0.0.1:8080')
  //       .post('/usuarios')
  //       .send(usuario)
  //       .set('x-access-token', token)
  //       .end((err, res) => {
  //         expect(res.statusCode).to.equal(200);
          
  //         done();
  //       });
  //   }); 
  // })
});