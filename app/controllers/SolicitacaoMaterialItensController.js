const security = require('../helpers/security')
const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /solicitacao-material-item:
 *    post:
 *      description: Insere um material em uma solicitacao de material
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id_solicitacao_material
 *          description: Id da solicitação de material
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: id_material
 *          description: Id do material
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: quantidade
 *          description: quantidade de material
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: valor_estimado
 *          description: valor estimado a ser gasto com o material
 *          in: formData
 *          required: true
 *          type: float
 *        - name: entregue
 *          description: Se o material foi entregue ou não
 *          in: formData
 *          required: true
 *          type: float
 *      responses:
 *        200:
 *          description: Objeto JSON que representa o objeto salvo
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.post('/', security.verifyJWT, function (req, res) {
    models.SolicitacaoMaterialItens.create(req.body)
        .then(solicitacaoMaterialItens => res.status(200).send(solicitacaoMaterialItens))
        .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * definitions:
 *   SolicitacaoMaterialItens:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       id_solicitacao_material:
 *         type: integer
 *       id_material:
 *         type: integer
 *       quantidade:
 *         type: integer
 *       entregue:
 *         type: boolean
 *       valor_estimado:
 *         type: float
 *       createdAt:
 *         type: date
 *       updatedAt:
 *         type: date
 *
 * /solicitacao-material-item:
 *    get:
 *      description: Retorna todas os itens de solicitações de profissionl
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Lista de itens de materiais
 *          schema:
 *            $ref: '#/definitions/SolicitacaoMaterialItens'
 *        500:
 *          description: Erro que não foi possível recuperar os itens da solicitação
 */
router.get('/', security.verifyJWT, function (req, res) {
    models.SolicitacaoMaterialItens.findAll()
    .then(solicitacaoMaterialItens => res.status(200).send(solicitacaoMaterialItens))
    .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * /solicitacao-material-item/:id:
 *    get:
 *      description: Retorna um item de uma solicitacao de material pelo id
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com o item da solicitação de material
 *        404:
 *          description: Item não encontrado na solicitação
 *        500:
 *          description: Erro que não foi possível buscar o item da solicitação
 */
router.get('/:id', security.verifyJWT, function (req, res) {
    models.SolicitacaoMaterialItens.findById(req.params.id)
    .then(solicitacaoMaterialItens =>
      {
        if (!solicitacaoMaterialItens) res.status(404).send("Not Found");
        res.status(200).send(solicitacaoMaterialItens)
      }
    )
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /solicitacao-material-item/:id:
 *    delete:
 *      description: Excluí um item de uma solicitação de material
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com mensagem de sucesso
 *        404:
 *          description: Item de solicitação de material não encontrada
 *        500:
 *          description: Erro que não foi possível excluir o item da solicitação de material
 */
router.delete('/:id', security.verifyJWT, function (req, res) {
    models.SolicitacaoMaterialItens.findById(req.params.id)
    .then(solicitacaoMaterialItens => {
      if (!solicitacaoMaterialItens) res.status(404).send("Not Found")

      models.solicitacaoMaterialItens.destroy({
        where: { id: req.params.id }
      })
      .then(solicitacaoMaterialItens => {
        res.status(200).send({success: true})
      })
      .catch(err => res.status(500).send({error: err}))
    })
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /solicitacao-material-item/:id:
 *    put:
 *      description: Atualiza um material em uma solicitacao de material
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id_solicitacao_material
 *          description: Id da solicitação de material
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: id_material
 *          description: Id do material
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: quantidade
 *          description: quantidade de material
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: valor_estimado
 *          description: valor estimado a ser gasto com o material
 *          in: formData
 *          required: true
 *          type: float
 *        - name: entregue
 *          description: Se o material foi entregue ou não
 *          in: formData
 *          required: true
 *          type: float
 *      responses:
 *        200:
 *          description: Objeto JSON que representa o objeto salvo
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.put('/:id', security.verifyJWT,function (req, res) {
    models.SolicitacaoMaterialItens.findById(req.params.id)
    .then(solicitacaoMaterialItens => {
        if (!solicitacaoMaterialItens) res.status(404).send("Not Found")

        solicitacaoMaterialItens.updateAttributes(req.body)

        res.status(200).send(solicitacaoMaterialItens)

    })
    .catch(err => {
      console.log(err)
      res.status(500).send({error: err})
    })
});

module.exports = router;
