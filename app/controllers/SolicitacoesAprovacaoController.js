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
                }, {
                  model: models.Usuario,
                  attributes: ["login","id_rede", "id_instituicao"],
                  include: [{
                    model: models.Pessoa
                  }, {
                    model: models.Rede
                  }, {
                    model: models.Perfil
                  }, {
                    model: models.PessoaJuridica,
                    include: [{
                      model: models.Pessoa
                    }]
                  }]
                }]
              }, {
                model: models.SolicitacaoProfissional,
                include: [{
                  model: models.EspecialidadeProfissional
                }, {
                  model: models.TipoDeAcaoProfissional
                }]
              },{
                model: models.TipoSolicitacao
              }, {
                  model: models.Usuario,
                  attributes: ["login","id_rede", "id_instituicao"],
                  include: [{
                    model: models.Pessoa
                  }, {
                    model: models.Rede
                  }, {
                    model: models.Perfil
                  }, {
                    model: models.PessoaJuridica,
                    include: [{
                      model: models.Pessoa
                    }]
                  }]
              }],
              order: [[models.StatusAtualSolicitacao, "id", "DESC"]]
            })
              .then(solicitacoes => {
                   let result = [];

                   solicitacoes.map(s => {

                      if (s.StatusAtualSolicitacaos[0].StatusSolicitacao.id_perfil == id_perfil) {
                        id_status = s.StatusAtualSolicitacaos[0].StatusSolicitacao.id
                        if (id_status === 4 || id_status === 7 || id_status === 10) {                          
                          if (s.StatusAtualSolicitacaos[0].id_usuario == req.userId)
                            result.push(s)
                        } else {
                          result.push(s)
                        }
                      }
                   })

                  res.status(200).send(result)
                })
              .catch(err => res.status(500).send(err))

        }
    })
    .catch(err => res.status(500).send({error: err}))
})

module.exports = router;
