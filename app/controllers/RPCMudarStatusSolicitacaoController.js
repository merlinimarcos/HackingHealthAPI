const security = require('../helpers/security')
const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /mudar-status-solicitacao:
 *    post:
 *      description: Muda o status de uma solicitação
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id_solicitacao
 *          description: Id da solicitação
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: id_status
 *          description: Id do status da solicitação
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: feedback
 *          description: Feedback
 *          in: formData
 *          required: true
 *          type: integer
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a nova especialidade
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */

router.post('/', security.verifyJWT, function (req, res) {
    let data = {
      id_usuario: req.userId,
      id_solicitacao: req.body.id_solicitacao,
      id_status: req.body.id_status,
      feedback: req.body.feedback,
      data_status: new Date().toISOString()
    }
    models.StatusAtualSolicitacao.create(req.body)
        .then(statusAtualSolicitacao => res.status(200).send(statusAtualSolicitacao))
        .catch(err => res.status(500).send({error: err}))
})

module.exports = router;
