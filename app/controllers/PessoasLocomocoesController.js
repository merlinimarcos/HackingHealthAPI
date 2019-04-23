const security = require('../helpers/security')
const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /pessoas-locomocoes:
 *    post:
 *      description: Insere um novo tipo de locomoção para uma pessoa
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id_pessoa
 *          description: ID da pessoa para inserir o tipo de locomoção
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: tipo
 *          description: Tipo de locomoção
 *          in: formData
 *          required: true
 *          type: string
 *        - name: descricao
 *          description: Descrição da locomoção
 *          in: formData
 *          required: true
 *          type: string 
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a locomoção uma pessoa
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.post('/', security.verifyJWT, function (req, res) {
    models.PessoaLocomocao.create(req.body)
        .then(locomocao => res.status(200).send(locomocao))
        .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * definitions:
 *   PessoaLocomocao:
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
 *       createdAt: 
 *         type: date
 *       updatedAt: 
 *         type: date
 * 
 * /pessoas-locomocoes:
 *    get:
 *      description: Retorna todas as locomoções cadastradas, podendo ser filtrada por pessoa pelo query param ?id_pessoa
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Lista de locomoções
 *          schema:
 *            $ref: '#/definitions/PessoaLocomocao'
 *        500:
 *          description: Erro que não foi possível recuperar as locomoções
 */
router.get('/', security.verifyJWT, function (req, res) {
    let id_pessoa = req.query.id_pessoa;
    let query = {}

    if (id_pessoa > 0)
        query = {where: {id_pessoa: id_pessoa}}

    models.PessoaLocomocao.findAll(query)
    .then(locomocoes => res.status(200).send(locomocoes))
    .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * /pessoas-locomocoes/:id:
 *    get:
 *      description: Retorna uma locomoção pelo id
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com a locomoção
 *        404:
 *          description: Locomoção não encontrada
 *        500:
 *          description: Erro que não foi possível buscar a locomoção
 */
router.get('/:id', security.verifyJWT, function (req, res) {
    models.PessoaLocomocao.findById(req.params.id)
    .then(locomocao =>
      {
        if (!locomocao) res.status(404).send("Not Found");
        res.status(200).send(locomocao)
      }
    )
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /pessoas-locomocoes/:id:
 *    delete:
 *      description: Excluí uma locomoção
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com mensagem de sucesso
 *        404:
 *          description: locomoção não encontrada
 *        500:
 *          description: Erro que não foi possível excluir a locomoção
 */
router.delete('/:id', security.verifyJWT, function (req, res) {
    models.PessoaLocomocao.findById(req.params.id)
    .then(locomocao => {
      if (!locomocao) res.status(404).send("Not Found")

      models.PessoaLocomocao.destroy({
        where: { id: req.params.id }
      })
      .then(locomocao => {
        res.status(200).send({success: true})
      })
      .catch(err => res.status(500).send({error: err}))
    })
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /pessoas-locomocoes/:id:
 *    put:
 *      description: Atualiza uma locomoção
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id_pessoa
 *          description: ID da pessoa para atualizar o tipo de locomoção
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: tipo
 *          description: Tipo de locomoção
 *          in: formData
 *          required: true
 *          type: string
 *        - name: descricao
 *          description: Descrição da locomoção
 *          in: formData
 *          required: true
 *          type: string 
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a atualização da locomoção
 *        404:
 *          description: locomoção não encontrada
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.put('/:id', security.verifyJWT,function (req, res) {
    models.PessoaLocomocao.findById(req.params.id)
    .then(locomocao => {
        if (!locomocao) res.status(404).send("Not Found")

        locomocao.updateAttributes(req.body)

        res.status(200).send(locomocao)

    })
    .catch(err => {
      console.log(err)
      res.status(500).send({error: err})
    })
});

module.exports = router;
