const security = require('../helpers/security')
const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/', security.verifyJWT, function (req, res) {

    models.UsuarioPerfil.create(
          req.body
        )
        .then(usuarioPerfil => {
            res.status(200).send(usuarioPerfil)
          }
        )
        .catch(err => {
          console.log(err)
          res.status(500).send({error: err})}
        )
})

router.get('/', security.verifyJWT,function (req, res) {
    models.Usuario.findById(req.userId, {
        attributes: ["login","id_rede", "id_instituicao"],
        include: [{
          model: models.Perfil,
        }]
      })
    .then(usuario => res.status(200).send(usuario))
    .catch(err => res.status(500).send({error: err}))
})

// Excluir um usuario
router.delete('/:id', security.verifyJWT,function (req, res) {
    models.UsuarioPerfil.findById(req.params.id)
    .then(usuarioPerfil => {
      if (!usuarioPerfil) res.status(404).send("Perfil do usuário não encontrado.")

      models.UsuarioPerfil.destroy({
        where: { id: req.params.id }
      })
      .then(usuarioPerfil => {
        res.status(200).send({success: true})
      })
      .catch(err => res.status(500).send({error: err}))
    })
    .catch(err => res.status(500).send({error: err}))
});

module.exports = router;
