const security = require('../helpers/security')
const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', security.verifyJWT,function (req, res) {
    let wherePerfil = {}
    let whereUser = {}

    if (req.query.id_perfil != null) {
      wherePerfil = {id: req.query.id_perfil}
    }

    if (req.query.id_instituicao) {
      whereUser = {id_instituicao: req.query.id_instituicao}
    }
 
    models.Usuario.findAll({
        attributes: ["login","id_rede", "id_instituicao"],
        include: [{
          model: models.Perfil,
          where: wherePerfil
        }, {
          model: models.Pessoa
        }],
        
        where: whereUser
      })
    .then(usuario => res.status(200).send(usuario))
    .catch(err => res.status(500).send({error: err}))
})


module.exports = router;
