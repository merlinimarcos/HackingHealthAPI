const express = require('express');
const router = express.Router();
const models = require('../models');
const security = require('../helpers/security')

router.get('/', security.verifyJWT, function (req, res) {
    let where = {}

    models.Usuario.findById(req.userId, {
        attributes: ["login","id_rede", "id_instituicao"],
        include: [{
          model: models.Perfil,
        }]
      })
    .then(usuario => {
      
        if (usuario.hasOwnProperty('Perfils')) {
            let id_perfil = usuario.Perfils[0].id;

            models.Solicitacao.findAll({include: [{
                model: models.StatusAtualSolicitacao,
                order: ["id", "DESC"],
                include: [{
                    model: models.StatusSolicitacao
                }]
              }, {
                model: models.TipoSolicitacao
              }, {
                  model: models.Usuario,
                  attributes: ["login","id_rede", "id_instituicao"],
              }]})
              .then(solicitacoes => {
                   let result = [];

                   solicitacoes.map(s => {
                      if (s.StatusAtualSolicitacaos[0].StatusSolicitacao.id_perfil == id_perfil)
                        result.push(s)    
                   })

                  res.status(200).send(result)
                })
              .catch(err => res.status(500).send(err))

        }
    })
    .catch(err => res.status(500).send({error: err}))
})

module.exports = router;
