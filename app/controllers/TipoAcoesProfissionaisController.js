const security = require('../helpers/security')
const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /tipos-acoes-profissionais:
 *    post:
 *      description: Insere um novo tipo de ação profissional
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: descricao_tipo_acao
 *          description: Descrição do tipo de ação
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Objeto JSON que representa o novo tipo de ação
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.post('/', security.verifyJWT, function (req, res) {
    models.TipoDeAcaoProfissional.create(req.body)
        .then(tipoDeAcaoProfissional => res.status(200).send(tipoDeAcaoProfissional))
        .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * definitions:
 *   TipoDeAcaoProfissional:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       descricao_tipo_acao:
 *         type: string
 *       createdAt:
 *         type: date
 *       updatedAt:
 *         type: date
 *
 * /tipos-acoes-profissionais:
 *    get:
 *      description: Retorna todas as ações de profissionais
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Lista de ações de profissionais
 *          schema:
 *            $ref: '#/definitions/TipoDeAcaoProfissional'
 *        500:
 *          description: Erro que não foi possível recuperar as ações dos profissionais
 */
router.get('/', security.verifyJWT, function (req, res) {
    models.TipoDeAcaoProfissional.findAll({order: [["descricao_tipo_acao", "ASC"]]})
    .then(tipoDeAcaoProfissional => res.status(200).send(tipoDeAcaoProfissional))
    .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * /tipos-acoes-profissionais/:id:
 *    get:
 *      description: Retorna um tipo de ação de profissional
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com o tipo de ação de profissional
 *        404:
 *          description: Tipo de ação não encontrado
 *        500:
 *          description: Erro que não foi possível buscar o tipo de ação
 */
router.get('/:id', security.verifyJWT, function (req, res) {
    models.TipoDeAcaoProfissional.findById(req.params.id)
    .then(tipoDeAcaoProfissional =>
      {
        if (!tipoDeAcaoProfissional) res.status(404).send("Not Found");
        res.status(200).send(tipoDeAcaoProfissional)
      }
    )
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /tipos-acoes-profissionais/:id:
 *    delete:
 *      description: Excluí uma ação de profissional
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com mensagem de sucesso
 *        404:
 *          description: Ação profissional não encontrada
 *        500:
 *          description: Erro que não foi possível excluir a ação
 */
router.delete('/:id', security.verifyJWT, function (req, res) {
    models.TipoDeAcaoProfissional.findById(req.params.id)
    .then(tipoDeAcaoProfissional => {
      if (!tipoDeAcaoProfissional) res.status(404).send("Not Found")

      models.TipoDeAcaoProfissional.destroy({
        where: { id: req.params.id }
      })
      .then(tipoDeAcaoProfissional => {
        res.status(200).send({success: true})
      })
      .catch(err => res.status(500).send({error: err}))
    })
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /tipos-acoes-profissionais/:id:
 *    put:
 *      description: Atualiza um tipo de ação
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: descricao_tipo_acao
 *          description: Descrição do tipo de ação
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Objeto JSON que representa o tipo de ação
 *        404:
 *          description: Tipo de ação não encontrado
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.put('/:id', security.verifyJWT,function (req, res) {
    models.TipoDeAcaoProfissional.findById(req.params.id)
    .then(tipoDeAcaoProfissional => {
        if (!tipoDeAcaoProfissional) res.status(404).send("Not Found")

        tipoDeAcaoProfissional.updateAttributes(req.body)

        res.status(200).send(tipoDeAcaoProfissional)

    })
    .catch(err => {
      console.log(err)
      res.status(500).send({error: err})
    })
});

module.exports = router;
