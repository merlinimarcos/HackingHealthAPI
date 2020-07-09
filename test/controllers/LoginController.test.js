const chai     = require('chai');
const expect   = chai.expect;
const should   = require('should');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('LoginController', () => {
  describe('POST', () => {
    it('Realiza um login com sucesso.', (done) => {
      const login = {
        login: 'admin',
        senha: '2JVJ2bR2'
      }
      chai.request('http://127.0.0.1:8080')
        .post('/login')
        .send(login)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.auth).to.equal(true);
          expect(res.body).to.have.property('token');

          done();
        });
    });

    it('Tenta um login com senha incorreta, retorna o erro de login inválido.', (done) => {
      let login = {
        login: 'admin',
        senha: 'senha'
      }
      chai.request('http://127.0.0.1:8080')
        .post('/login')
        .send(login)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.error).to.equal('Login inválido!');

          done();
        });
    });
  });
});
