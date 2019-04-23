const security = require('../helpers/security')
const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /materiais:
 *    post:
 *      description: Insere uma novo material
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id_grupo
 *          description: Id do grupo do material
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: id_unidade
 *          description: Id da unidade de medida do material
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: descricao_material
 *          description: Descrição do material
 *          in: formData
 *          required: true
 *          type: string
 *        - name: valor
 *          description: Valor estimado do material
 *          in: formData
 *          required: true
 *          type: float
 *      responses:
 *        200:
 *          description: Objeto JSON que representa o novo material
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.post('/', security.verifyJWT, function (req, res) {
    models.Material.create(req.body)
        .then(material => res.status(200).send(material))
        .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * definitions:
 *   Material:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       id_grupo:
 *         type: integer
 *       id_unidade:
 *         type: integer
 *       descricao_material:
 *         type: string
 *       createdAt: 
 *         type: date
 *       updatedAt: 
 *         type: date
 * 
 * /materiais:
 *    get:
 *      description: Retorna todas os materiais cadastradas
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Lista de materiais
 *          schema:
 *            $ref: '#/definitions/Material'
 *        500:
 *          description: Erro que não foi possível recuperar os materiais
 */
router.get('/', security.verifyJWT, function (req, res) {
    models.Material.findAll({include: [{model: models.GruposMateriais, required: true}]})
    .then(materiais => res.status(200).send(materiais))
    .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * /materiais/:id:
 *    get:
 *      description: Retorna um material pelo id
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com o material
 *        404:
 *          description: Material não encontrado
 *        500:
 *          description: Erro que não foi possível buscar o material
 */
router.get('/:id', security.verifyJWT, function (req, res) {
    models.Material.findById(req.params.id, {include: [{model: models.GruposMateriais, required: true}]})
    .then(material =>
      {
        if (!material) res.status(404).send("Not Found");
        res.status(200).send(material)
      }
    )
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /materiais/:id:
 *    delete:
 *      description: Excluí um material
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com mensagem de sucesso
 *        404:
 *          description: Material não encontrado
 *        500:
 *          description: Erro que não foi possível excluir o material
 */
router.delete('/:id', security.verifyJWT, function (req, res) {
    models.Material.findById(req.params.id)
    .then(material => {
      if (!material) res.status(404).send("Not Found")

      models.Material.destroy({
        where: { id: req.params.id }
      })
      .then(material => {
        res.status(200).send({success: true})
      })
      .catch(err => res.status(500).send({error: err}))
    })
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /materiais/:id:
 *    put:
 *      description: Atualiza um material
 *      produces:
 *        - application/json
 *        - name: id_grupo
 *          description: Id do grupo do material
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: id_unidade
 *          description: Id da unidade de medida do material
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: descricao_material
 *          description: Descrição do material
 *          in: formData
 *          required: true
 *          type: string
 *        - name: valor
 *          description: Valor estimado do material
 *          in: formData
 *          required: true
 *          type: float
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a atualização do material
 *        404:
 *          description: Material não encontrado
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.put('/:id', security.verifyJWT,function (req, res) {
    models.Material.findById(req.params.id)
    .then(material => {
        if (!material) res.status(404).send("Not Found")

        material.updateAttributes(req.body)

        res.status(200).send(material)

    })
    .catch(err => {
      console.log(err)
      res.status(500).send({error: err})
    })
});

module.exports = router;
