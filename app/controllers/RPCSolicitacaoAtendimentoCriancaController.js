const express = require('express');
const router = express.Router();
const models = require('../models');
const security = require('../helpers/security')

router.post('/', security.verifyJWT, function (req, res) {
    let data = {
      descricao: req.body.descricao,
      tipo_solicitacao: 1,
      id_usuario: req.userId,
      dt_solicitacao: new Date().toISOString()
    }

    models.Solicitacao.create(data)
    .then(solicitacao => {
        let data = {
          id: solicitacao.id,
          id_pessoa: req.body.id_pessoa
        }

        models.SolicitacaoAtendimentoCrianca.create(data)
        .then(solicitacaoAtendimentoCrianca => {
          let data = {
            id_solicitacao: solicitacaoAtendimentoCrianca.id,
            id_status: 1,
            id_usuario: req.userId,
            feedback: "",
            data_status: new Date().toISOString()
          }
          models.StatusAtualSolicitacao.create(data)
          res.status(200).send(solicitacaoAtendimentoCrianca)
        })
        .catch(err => res.status(500).send({error: err}))
    }).catch(err => res.status(500).send({error: err}))
})


router.get('/', function (req, res) {
    models.SolicitacaoAtendimentoCrianca.findAll({include: [{
      model: models.Solicitacao,
      include: [{
          model: models.Usuario,
          attributes: ["login","id_rede", "id_instituicao"]
      }, {
        model: models.TipoSolicitacao
      }]
    }]})
    .then(solicitacaoAtendimentoCrianca => res.status(200).send(solicitacaoAtendimentoCrianca))
    .catch(err => res.status(500).send(err))
})

router.get('/:id', function (req, res) {
    models.solicitacaoAtendimentoCrianca.findById(req.params.id, {include: [{
      model: models.Solicitacao,
      include: [{
          model: models.Usuario,
          attributes: ["login","id_rede", "id_instituicao"]
      }, {
        model: models.TipoSolicitacao
      }]
    }]})
    .then(solicitacaoAtendimentoCrianca =>
      {
        if (!solicitacaoAtendimentoCrianca) res.status(404).send("Not Found");
        res.status(200).send(solicitacaoAtendimentoCrianca)
      }
    )
    .catch(err => res.status(500).send({error: err}))
});

router.delete('/:id', function (req, res) {
    models.SolicitacaoAtendimentoCrianca.findById(req.params.id)
    .then(solicitacaoAtendimentoCrianca => {
      if (!solicitacaoAtendimentoCrianca) res.status(404).send("Not Found")

      models.SolicitacaoAtendimentoCrianca.destroy({
        where: { id: req.params.id }
      })
      .then(solicitacaoAtendimentoCrianca => {
        res.status(200).send({success: true})
      })
      .catch(err => res.status(500).send({error: err}))
    })
    .catch(err => res.status(500).send({error: err}))
});

router.put('/:id', function (req, res) {

  models.Solicitacao.findById(req.params.id)
  .then(solicitacao => {
      if (!solicitacao) res.status(404).send("Not Found")

      let data = {
        descricao: req.body.descricao,
      }

      solicitacao.updateAttributes(data)

      models.solicitacaoAtendimentoCrianca.findById(req.params.id)
      .then(solicitacaoAtendimentoCrianca => {

        if (!solicitacaoAtendimentoCrianca) res.status(404).send("Not Found")

        let data = {
          id: solicitacao.id,
          id_pessoa: req.body.id_pessoa
        }
        solicitacaoAtendimentoCrianca.updateAttributes(data)
        res.status(200).send(solicitacaoAtendimentoCrianca)
      })
      .catch(err => res.status(500).send({error: err}))
  }).catch(err => res.status(500).send({error: err}))
});

module.exports = router;
