var jwt = require('jsonwebtoken');
const listaPerfis = require('./perfis');

function verifyJWT(req, res, next){
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    let permiteRota = false;

    for (let index in decoded.perfis) {
      let perfil = decoded.perfis[index];

      if (listaPerfis[perfil] && listaPerfis[perfil].includes(req.baseUrl))
        permiteRota = true;
    }

    if (permiteRota) {
      req.userId = decoded.id;
      next();
    } else {
      return res.status(500).send({ auth: false, message: 'Você não tem permissão para acessar essa rota.'});
    }
  });
}

module.exports = {verifyJWT: verifyJWT}