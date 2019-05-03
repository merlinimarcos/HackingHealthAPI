const express = require('express');
const router = express.Router();
const models = require('../models');
const security = require('../helpers/security')

router.post('/', security.verifyJWT, function (req, res) {
    let data = {
      descricao: req.body.descricao,
      tipo_solicitacao: 3,
      id_usuario: req.userId,
      dt_solicitacao: new Date().toISOString()
    }

    models.Solicitacao.create(data)
    .then(solicitacao => {
        let data = {
          id: solicitacao.id,
          id_tipo_acao: req.body.id_tipo_acao,
          id_especialidade: req.body.id_especialidade,
          outra_especialidade: req.body.outra_especialidade,
          outra_acao: req.body.outra_acao,
          dt_necessidade: req.body.dt_necessidade,
          custo_estimado: req.body.custo_estimado
        }

        models.SolicitacaoProfissional.create(data)
        .then(solicitacaoProfissional => res.status(200).send(solicitacaoProfissional))
        .catch(err => res.status(500).send({error: err}))
    }).catch(err => res.status(500).send({error: err}))
})


router.get('/', function (req, res) {
    models.SolicitacaoProfissional.findAll({include: [{
      model: models.Solicitacao,
      include: [{
          model: models.Usuario,
          attributes: ["login","id_rede", "id_instituicao"]
      }, {
        model: models.TipoSolicitacao
      }]
    }, {
      model: models.EspecialidadeProfissional
    }, {
      model: models.TipoDeAcaoProfissional
    }]})
    .then(solicitacaoProfissional => res.status(200).send(solicitacaoProfissional))
    .catch(err => res.status(500).send(err))
})

router.get('/:id', function (req, res) {
    models.SolicitacaoProfissional.findById(req.params.id, {include: [{
      model: models.Solicitacao,
      model: models.EspecialidadeProfissional,
      model: models.TipoDeAcaoProfissional,
      include: [{
          model: models.Usuario,
          attributes: ["login","id_rede", "id_instituicao"]
      }, {
        model: models.TipoSolicitacao
      }]
    }]})
    .then(solicitacaoProfissional =>
      {
        if (!solicitacaoProfissional) res.status(404).send("Not Found");
        res.status(200).send(solicitacaoProfissional)
      }
    )
    .catch(err => res.status(500).send({error: err}))
});

router.delete('/:id', function (req, res) {
    models.SolicitacaoProfissional.findById(req.params.id)
    .then(solicitacaoProfissional => {
      if (!solicitacaoProfissional) res.status(404).send("Not Found")

      models.SolicitacaoProfissional.destroy({
        where: { id: req.params.id }
      })
      .then(solicitacaoProfissional => {
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

      models.SolicitacaoProfissional.findById(req.params.id)
      .then(solicitacaoProfissional => {

        if (!solicitacaoProfissional) res.status(404).send("Not Found")

        let data = {
          id_tipo_acao: req.body.id_tipo_acao,
          id_especialidade: req.body.id_especialidade,
          outra_especialidade: req.body.outra_especialidade,
          outra_acao: req.body.outra_acao,
          dt_necessidade: req.body.dt_necessidade,
          custo_estimado: req.body.custo_estimado
        }

        solicitacaoProfissional.updateAttributes(data)
        res.status(200).send(solicitacaoProfissional)
      })
      .catch(err => res.status(500).send({error: err}))
  }).catch(err => res.status(500).send({error: err}))
});

module.exports = router;
