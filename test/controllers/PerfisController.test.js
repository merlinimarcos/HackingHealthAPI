const chai     = require('chai');
const expect   = chai.expect;
const should   = require('should');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const userCredentials = {
  login: 'admin',
  senha: '2JVJ2bR2'
}

describe('PerfisController', () => { 
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
    it('Retorna todos os perfis com sucesso.', (done) => {
      chai.request('http://127.0.0.1:8080')
        .get('/perfis')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.a('array');
          
          done();
        });
    });

    it('Retorna um perfil pelo id.', (done) => {
      let id = 1;
      chai.request('http://127.0.0.1:8080')
        .get('/perfis/' + id)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.id).to.equal(id);

          done();
        });
    });

    it('Tenta buscar um perfil que não existe, retorna o erro de não encontrado.', (done) => {
      let id = 999999;
      chai.request('http://127.0.0.1:8080')
        .get('/perfis/' + id)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.equal('Not Found');

          done();
        });
    });
  });

  describe('POST', () => {
    
  });

  describe('DELETE', () => {

  });

  describe('PUT', () => {

  });
});
