const express = require('express');
const router = express.Router();
const models = require('../models');
const security = require('../helpers/security')

router.post('/', security.verifyJWT, function (req, res) {
    let data = {
      descricao: req.body.descricao,
      tipo_solicitacao: 2,
      id_usuario: req.userId,
      dt_solicitacao: new Date().toISOString()
    }

    models.Solicitacao.create(data)
    .then(solicitacao => {
        let data = {
          id: solicitacao.id,
          prestacao_de_contas: req.body.prestacao_de_contas,
          dt_prestacao_contas: req.body.dt_prestacao_contas
        }

        models.SolicitacaoMaterial.create(data)
        .then(solicitacaoMaterial => res.status(200).send(solicitacaoMaterial))
        .catch(err => res.status(500).send({error: err}))
    }).catch(err => res.status(500).send({error: err}))
})


router.get('/', function (req, res) {
    models.SolicitacaoMaterial.findAll({include: [{
      model: models.Solicitacao,
      include: [{
          model: models.Usuario,
          attributes: ["login","id_rede", "id_instituicao"]
      }, {
        model: models.TipoSolicitacao
      }]
    }]})
    .then(solicitacaoMaterial => res.status(200).send(solicitacaoMaterial))
    .catch(err => res.status(500).send(err))
})

router.get('/:id', function (req, res) {
    models.SolicitacaoMaterial.findById(req.params.id, {include: [{
      model: models.Solicitacao,
      include: [{
          model: models.Usuario,
          attributes: ["login","id_rede", "id_instituicao"]
      }, {
        model: models.TipoSolicitacao
      }]
    }]})
    .then(solicitacaoMaterial =>
      {
        if (!solicitacaoMaterial) res.status(404).send("Not Found");
        res.status(200).send(solicitacaoMaterial)
      }
    )
    .catch(err => res.status(500).send({error: err}))
});

router.delete('/:id', function (req, res) {
    models.SolicitacaoMaterial.findById(req.params.id)
    .then(solicitacaoMaterial => {
      if (!solicitacaoMaterial) res.status(404).send("Not Found")

      models.SolicitacaoMaterial.destroy({
        where: { id: req.params.id }
      })
      .then(solicitacaoMaterial => {
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

      models.SolicitacaoMaterial.findById(req.params.id)
      .then(solicitacaoMaterial => {

        if (!solicitacaoMaterial) res.status(404).send("Not Found")

        let data = {
          id: solicitacao.id,
          prestacao_de_contas: req.body.prestacao_de_contas,
          dt_prestacao_contas: req.body.dt_prestacao_contas
        }
        solicitacaoMaterial.updateAttributes(data)
        res.status(200).send(solicitacaoMaterial)
      })
      .catch(err => res.status(500).send({error: err}))
  }).catch(err => res.status(500).send({error: err}))
});

module.exports = router;
