const security = require('../helpers/security')
const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /unidades-materiais:
 *    post:
 *      description: Insere uma unidade de material
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: descricao_unidade
 *          description: Descrição da unidade de medida do material
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a nova unidade
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.post('/', security.verifyJWT, function (req, res) {
    models.UnidadeMaterial.create(req.body)
        .then(unidadeMaterial => res.status(200).send(unidadeMaterial))
        .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * definitions:
 *   UnidadesMateriais:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       descricao_unidade:
 *         type: string
 *       createdAt:
 *         type: date
 *       updatedAt:
 *         type: date
 *
 * /unidades-materiais:
 *    get:
 *      description: Retorna todas as unidades de materiais
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Lista de unidades de materiais
 *          schema:
 *            $ref: '#/definitions/UnidadesMateriais'
 *        500:
 *          description: Erro que não foi possível recuperar as unidades de materiais
 */
router.get('/', security.verifyJWT, function (req, res) {
    models.UnidadesMateriais.findAll()
    .then(unidadesMateriais => res.status(200).send(unidadesMateriais))
    .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * /unidades-materiais/:id:
 *    get:
 *      description: Retorna uma unidade
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com a unidade
 *        404:
 *          description: Tipo de unidade
 *        500:
 *          description: Erro que não foi possível buscar a unidade
 */
router.get('/:id', security.verifyJWT, function (req, res) {
    models.UnidadesMateriais.findById(req.params.id)
    .then(unidadesMateriais =>
      {
        if (!unidadesMateriais) res.status(404).send("Not Found");
        res.status(200).send(unidadesMateriais)
      }
    )
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /unidades-materiais/:id:
 *    delete:
 *      description: Excluí uma unidade
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com mensagem de sucesso
 *        404:
 *          description: UnidadeMaterial não encontrada
 *        500:
 *          description: Erro que não foi possível excluir a unidade de material
 */
router.delete('/:id', security.verifyJWT, function (req, res) {
    models.UnidadesMateriais.findById(req.params.id)
    .then(unidadesMateriais => {
      if (!unidadesMateriais) res.status(404).send("Not Found")

      models.UnidadesMateriais.destroy({
        where: { id: req.params.id }
      })
      .then(unidadesMateriais => {
        res.status(200).send({success: true})
      })
      .catch(err => res.status(500).send({error: err}))
    })
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /unidades-materiais/:id:
 *    put:
 *      description: Atualiza uma unidade de material
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: descricao_unidade
 *          description: Descrição da unidade
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a unidade do material
 *        404:
 *          description: Unidade material não encontrado
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.put('/:id', security.verifyJWT,function (req, res) {
    models.UnidadesMateriais.findById(req.params.id)
    .then(unidadeMaterial => {
        if (!unidadeMaterial) res.status(404).send("Not Found")

        unidadeMaterial.updateAttributes(req.body)

        res.status(200).send(unidadeMaterial)

    })
    .catch(err => {
      console.log(err)
      res.status(500).send({error: err})
    })
});

module.exports = router;
