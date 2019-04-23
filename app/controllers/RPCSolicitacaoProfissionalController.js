const express = require('express');
const router = express.Router();
const models = require('../models');
const security = require('../helpers/security')

router.post('/', security.verifyJWT, function (req, res) {
    let data = req.body.solicitacao
    data.tipo_solicitacao = 3
    data.id_usuario = req.userId
    data.dt_solicitacao = new Date().toISOString()

    models.Solicitacao.create(data)
    .then(solicitacao => {
        let data = req.body.solicitacao_profissional
        data.id = solicitacao.id

        models.SolicitacaoProfissional.create(data)
        .then(solicitacaoProfissional => res.status(200).send(solicitacaoProfissional))
        .catch(err => res.status(500).send({error: err}))  
    }).catch(err => res.status(500).send({error: err}))
})


router.get('/', function (req, res) {
    models.SolicitacaoProfissional.findAll()
    .then(solicitacoesProfissional => res.status(200).send(solicitacoesProfissional))
    .catch(err => res.status(500).send(err))
})

router.get('/:id', function (req, res) {
    models.SolicitacaoProfissional.findById(req.params.id)
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
    models.SolicitacaoProfissional.findById(req.params.id)
    .then(solicitacaoProfissional => {
        if (!solicitacaoProfissional) res.status(404).send("Not Found")

        solicitacaoProfissional.updateAttributes(req.body)

        res.status(200).send(solicitacaoProfissional)

    })
    .catch(err => {
      console.log(err)
      res.status(500).send({error: err})
    })
});

module.exports = router;
