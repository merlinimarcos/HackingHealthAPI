const security = require('../helpers/security')
const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /redes:
 *    post:
 *      description: Insere uma nova rede
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: descricao
 *          description: Descrição da rede
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a nova rede
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.post('/', security.verifyJWT, function (req, res) {
    models.Rede.create(req.body)
        .then(rede => res.status(200).send(rede))
        .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * definitions:
 *   Rede:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       descricao:
 *         type: string
 *       createdAt: 
 *         type: date
 *       updatedAt: 
 *         type: date
 * 
 * /redes:
 *    get:
 *      description: Retorna todas as redes
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Lista de redes
 *          schema:
 *            $ref: '#/definitions/Rede'
 *        500:
 *          description: Erro que não foi possível recuperar as redes
 */
router.get('/', security.verifyJWT, function (req, res) {
    models.Rede.findAll()
    .then(redes => res.status(200).send(redes))
    .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * /redes/:id:
 *    get:
 *      description: Retorna uma rede pelo id
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com a rede
 *        404:
 *          description: rede não encontrada
 *        500:
 *          description: Erro que não foi possível buscar a rede
 */
router.get('/:id', security.verifyJWT, function (req, res) {
    models.Rede.findById(req.params.id)
    .then(rede =>
      {
        if (!rede) res.status(404).send("Not Found");
        res.status(200).send(rede)
      }
    )
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /redes/:id:
 *    delete:
 *      description: Excluí uma rede
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com mensagem de sucesso
 *        404:
 *          description: rede não encontrada
 *        500:
 *          description: Erro que não foi possível excluir a rede
 */
router.delete('/:id', security.verifyJWT, function (req, res) {
    models.Rede.findById(req.params.id)
    .then(rede => {
      if (!rede) res.status(404).send("Not Found")

      models.Rede.destroy({
        where: { id: req.params.id }
      })
      .then(rede => {
        res.status(200).send({success: true})
      })
      .catch(err => res.status(500).send({error: err}))
    })
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /redes/:id:
 *    put:
 *      description: Atualiza uma rede
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: descricao
 *          description: Descrição da rede
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a atualização da rede
 *        404:
 *          description: rede não encontrada
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.put('/:id', security.verifyJWT,function (req, res) {
    models.Rede.findById(req.params.id)
    .then(rede => {
        if (!rede) res.status(404).send("Not Found")

        rede.updateAttributes(req.body)

        res.status(200).send(rede)

    })
    .catch(err => {
      console.log(err)
      res.status(500).send({error: err})
    })
});

module.exports = router;
