const chai     = require('chai');
const expect   = chai.expect;
const should   = require('should');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const userCredentials = {
  login: 'admin',
  senha: '2JVJ2bR2'
}

describe('ModeloProcessosController', () => {
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

  describe('GET', () => {
    it('Retorna todos os modelos de processos.', (done) => {
      chai.request('http://127.0.0.1:8080')
      .get('/perfis')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.a('array');
          
          done();
        });
    })
  });

});