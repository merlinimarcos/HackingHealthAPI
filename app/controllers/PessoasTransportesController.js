const security = require('../helpers/security')
const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /pessoas-transportes:
 *    post:
 *      description: Insere um novo transporte para uma pessoa
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id_pessoa
 *          description: ID da pessoa
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: tipo
 *          description: Tipo do transporte
 *          in: formData
 *          required: true
 *          type: string
 *        - name: descricao
 *          description: Descrição do transporte
 *          in: formData
 *          required: true
 *          type: string 
 *        - name: responsavel
 *          description: Responsavel do transporte
 *          in: formData
 *          required: true
 *          type: string 
 *      responses:
 *        200:
 *          description: Objeto JSON que representa o transporte de uma pessoa
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.post('/', security.verifyJWT, function (req, res) {
    models.PessoaTransporte.create(req.body)
        .then(transporte => res.status(200).send(transporte))
        .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * definitions:
 *   PessoaTransporte:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       id_pessoa:
 *         type: integer
 *       tipo:
 *         type: string
 *       descricao:
 *         type: string
 *       responsavel:
 *         type: string
 *       createdAt: 
 *         type: date
 *       updatedAt: 
 *         type: date
 * 
 * /pessoas-transportes:
 *    get:
 *      description: Retorna todos os Transportes cadastrados, podendo ser filtrado por pessoa pelo query param ?id_pessoa
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Lista de Transportes
 *          schema:
 *            $ref: '#/definitions/PessoaTransporte'
 *        500:
 *          description: Erro que não foi possível recuperar os Transportes
 */
router.get('/', security.verifyJWT, function (req, res) {
    let id_pessoa = req.query.id_pessoa;
    let query = {}

    if (id_pessoa > 0)
        query = {where: {id_pessoa: id_pessoa}}

    models.PessoaTransporte.findAll(query)
    .then(transportes => res.status(200).send(transportes))
    .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * /pessoas-transportes/:id:
 *    get:
 *      description: Retorna um Transporte pelo id
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com o Transporte
 *        404:
 *          description: Transporte não encontrada
 *        500:
 *          description: Erro que não foi possível buscar o Transporte
 */
router.get('/:id', security.verifyJWT, function (req, res) {
    models.PessoaTransporte.findById(req.params.id)
    .then(transporte =>
      {
        if (!transporte) res.status(404).send("Not Found");
        res.status(200).send(transporte)
      }
    )
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /pessoas-transportes/:id:
 *    delete:
 *      description: Excluí um Transporte
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com mensagem de sucesso
 *        404:
 *          description: Transporte não encontrado
 *        500:
 *          description: Erro que não foi possível excluir o Transporte
 */
router.delete('/:id', security.verifyJWT, function (req, res) {
    models.PessoaTransporte.findById(req.params.id)
    .then(transporte => {
      if (!transporte) res.status(404).send("Not Found")

      models.PessoaTransporte.destroy({
        where: { id: req.params.id }
      })
      .then(transporte => {
        res.status(200).send({success: true})
      })
      .catch(err => res.status(500).send({error: err}))
    })
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /pessoas-transportes/:id:
 *    put:
 *      description: Atualiza um Transporte
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id_pessoa
 *          description: ID da pessoa
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: tipo
 *          description: Tipo do Transporte
 *          in: formData
 *          required: true
 *          type: string
 *        - name: descricao
 *          description: Descrição do Transporte
 *          in: formData
 *          required: true
 *          type: string
 *        - name: responsavel
 *          description: Responsavel do transporte
 *          in: formData
 *          required: true
 *          type: string   
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a atualização do Transporte
 *        404:
 *          description: transporte não encontrado
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.put('/:id', security.verifyJWT,function (req, res) {
    models.PessoaTransporte.findById(req.params.id)
    .then(transporte => {
        if (!transporte) res.status(404).send("Not Found")

        transporte.updateAttributes(req.body)

        res.status(200).send(transporte)

    })
    .catch(err => {
      console.log(err)
      res.status(500).send({error: err})
    })
});

module.exports = router;
