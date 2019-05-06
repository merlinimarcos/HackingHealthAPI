const express = require('express');
const router = express.Router();
const models = require('../models');
const security = require('../helpers/security')

router.get('/', security.verifyJWT, function (req, res) {
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
        where: {id: req.userId}
    }]})
    .then(solicitacoes => res.status(200).send(solicitacoes))
    .catch(err => res.status(500).send(err))
})

module.exports = router;
