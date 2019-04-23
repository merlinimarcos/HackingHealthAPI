const security = require('../helpers/security')
const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /grupos-materiais:
 *    post:
 *      description: Insere um novo grupo de materiais
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: descricao_grupo
 *          description: Descrição do grupo de materiais
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Objeto JSON que representa o novo grupo de materiais
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.post('/', security.verifyJWT, function (req, res) {
    models.GruposMateriais.create(req.body)
        .then(grupoMateriai => res.status(200).send(grupoMateriai))
        .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * definitions:
 *   GrupoMaterial:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       descricao_grupo:
 *         type: string
 *       createdAt: 
 *         type: date
 *       updatedAt: 
 *         type: date
 * 
 * /grupos-materiais:
 *    get:
 *      description: Retorna todos os grupos de materiais
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Lista de grupos de materiais
 *          schema:
 *            $ref: '#/definitions/GrupoMaterial'
 *        500:
 *          description: Erro que não foi possível recuperar os dados
 */
router.get('/', security.verifyJWT, function (req, res) {
    models.GruposMateriais.findAll()
    .then(gruposMateriais => res.status(200).send(gruposMateriais))
    .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * /grupos-materiais/:id:
 *    get:
 *      description: Retorna um grupo de material pelo id
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com o grupo de material
 *        404:
 *          description: Grupo material não encontrado
 *        500:
 *          description: Erro que não foi possível buscar o grupo de material
 */
router.get('/:id', security.verifyJWT, function (req, res) {
    models.GruposMateriais.findById(req.params.id)
    .then(grupoMateriai =>
      {
        if (!grupoMateriai) res.status(404).send("Not Found");
        res.status(200).send(grupoMateriai)
      }
    )
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /grupos-materiais/:id:
 *    delete:
 *      description: Excluí um grupo de material
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com mensagem de sucesso
 *        404:
 *          description: Grupo material não encontrado
 *        500:
 *          description: Erro que não foi possível excluir o grupo de material
 */
router.delete('/:id', security.verifyJWT, function (req, res) {
    models.GruposMateriais.findById(req.params.id)
    .then(grupoMateriai => {
      if (!grupoMateriai) res.status(404).send("Not Found")

      models.GruposMateriais.destroy({
        where: { id: req.params.id }
      })
      .then(grupoMateriai => {
        res.status(200).send({success: true})
      })
      .catch(err => res.status(500).send({error: err}))
    })
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /grupos-materiais/:id:
 *    put:
 *      description: Atualiza um grupo de material
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: descricao_grupo
 *          description: Descrição do grupo
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a atualização do grupo de material
 *        404:
 *          description: Grupo material não encontrado
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.put('/:id', security.verifyJWT,function (req, res) {
    models.GruposMateriais.findById(req.params.id)
    .then(grupoMateriai => {
        if (!grupoMateriai) res.status(404).send("Not Found")

        grupoMateriai.updateAttributes(req.body)

        res.status(200).send(grupoMateriai)

    })
    .catch(err => {
      console.log(err)
      res.status(500).send({error: err})
    })
});

module.exports = router;
