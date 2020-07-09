const chai     = require('chai');
const expect   = chai.expect;
const should   = require('should');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const userCredentials = {
  login: 'admin',
  senha: '2JVJ2bR2'
}

describe('RedesController', () => {
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
    it('Retorna todas as redes.', (done) => {
      chai.request('http://127.0.0.1:8080')
        .get('/redes')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.a('array');

          done();
        });
      });

    let id = 1;
    let descricao = 'Oeste Santa Catarina';
    it('Retorna uma rede com base em um id.', (done) => {
      chai.request('http://127.0.0.1:8080')
        .get('/redes/' + id)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.id).to.equal(id);
          expect(res.body.descricao).to.equal(descricao);

          done();
        });
    });  
  });
});