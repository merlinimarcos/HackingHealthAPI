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
 *          type: string
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
      data_status: new Date().toISOString(),
      concluido: req.body.concluido,
      email_shriner_aprovador_regional: req.body.email_shriner_aprovador_regional,
      id_comite_comunitario_regional: req.body.id_comite_comunitario_regional,
      aprovar_requisicao: req.body.aprovar_requisicao,
      requisicao_atendida_localmente: req.body.requisicao_atendida_localmente,
      existe_estimativa_de_valor: req.body.existe_estimativa_de_valor,
      encaminhar_clube: req.body.encaminhar_clube,
      encaminhar_templo: req.body.encaminhar_templo,
      requisicao_atendida_clube: req.body.requisicao_atendida_clube
    }
    models.StatusAtualSolicitacao.create(data)
        .then(statusAtualSolicitacao => res.status(200).send(statusAtualSolicitacao))
        .catch(err => res.status(500).send({error: err}))
})

router.put('/:id', security.verifyJWT, function (req, res) {
  let data = {    
    feedback: req.body.feedback,    
    concluido: req.body.concluido,
    id_usuario_reivindicacao: req.userId,
    email_shriner_aprovador_regional: req.body.email_shriner_aprovador_regional,
    id_comite_comunitario_regional: req.body.id_comite_comunitario_regional,
    aprovar_requisicao: req.body.aprovar_requisicao,
    requisicao_atendida_localmente: req.body.requisicao_atendida_localmente,
    existe_estimativa_de_valor: req.body.existe_estimativa_de_valor,
    encaminhar_clube: req.body.encaminhar_clube,
    encaminhar_templo: req.body.encaminhar_templo,
    requisicao_atendida_clube: req.body.requisicao_atendida_clube
  }
  
  models.StatusAtualSolicitacao.findById(req.params.id).then(status => {
    status.updateAttributes(data)
    .then(status => res.status(200).send(status))
    .catch(err => res.status(500).send({error: err}))
  })

  
})

module.exports = router;
