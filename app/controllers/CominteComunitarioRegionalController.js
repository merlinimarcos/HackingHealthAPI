const security = require('../helpers/security')
const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/', security.verifyJWT, function (req, res) {
    models.ComiteComunitarioRegional.create(req.body)
        .then(comiteComunitarioRegional => res.status(200).send(comiteComunitarioRegional))
        .catch(err => res.status(500).send({error: err}))
})

router.get('/', security.verifyJWT, function (req, res) {
    models.ComiteComunitarioRegional.findAll({order: [["descricao", "ASC"]]})
    .then(comites => res.status(200).send(comites))
    .catch(err => res.status(500).send({error: err}))
})

module.exports = router;
