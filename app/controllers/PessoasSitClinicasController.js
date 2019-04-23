const security = require('../helpers/security')
const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /pessoas-sit-clinicas:
 *    post:
 *      description: Insere um nova situação clinica para uma pessoa
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id_pessoa
 *          description: ID da pessoa
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: tipo
 *          description: Tipo situação clinica
 *          in: formData
 *          required: true
 *          type: string
 *        - name: descricao
 *          description: Descrição situação clinica
 *          required: true
 *          type: string 
 *        - name: dt_inicio
 *          description: data inicial sitituação
 *          required: true
 *          type: date
 *        - name: desc_inicio
 *          description: Descrição inicial sitituação
 *          required: true
 *          type: string
 *        - name: desc_tratamentos_anteriores
 *          description: Descrição tratamentos anteriores
 *          required: true
 *          type: string 
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a situação clínica de uma pessoa
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.post('/', security.verifyJWT, function (req, res) {
    models.PessoaSitClinica.create(req.body)
        .then(situacao => res.status(200).send(situacao))
        .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * definitions:
 *   PessoaSitClinica:
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
 * /pessoas-sit-clinicas:
 *    get:
 *      description: Retorna todas as situações cadastradas, podendo ser filtrada por pessoa pelo query param ?id_pessoa
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Lista de situações
 *          schema:
 *            $ref: '#/definitions/PessoaSitClinica'
 *        500:
 *          description: Erro que não foi possível recuperar as situações
 */
router.get('/', security.verifyJWT, function (req, res) {
    let id_pessoa = req.query.id_pessoa;
    let query = {}

    if (id_pessoa > 0)
        query = {where: {id_pessoa: id_pessoa}}

    models.PessoaSitClinica.findAll(query)
    .then(situacoes => res.status(200).send(situacoes))
    .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * /pessoas-sit-clinicas/:id:
 *    get:
 *      description: Retorna uma situação pelo id
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com a situação
 *        404:
 *          description: situação não encontrada
 *        500:
 *          description: Erro que não foi possível buscar a situação
 */
router.get('/:id', security.verifyJWT, function (req, res) {
    models.PessoaSitClinica.findById(req.params.id)
    .then(situacao =>
      {
        if (!situacao) res.status(404).send("Not Found");
        res.status(200).send(situacao)
      }
    )
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /pessoas-sit-clinicas/:id:
 *    delete:
 *      description: Excluí uma situação
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com mensagem de sucesso
 *        404:
 *          description: situação não encontrada
 *        500:
 *          description: Erro que não foi possível excluir a situação
 */
router.delete('/:id', security.verifyJWT, function (req, res) {
    models.PessoaSitClinica.findById(req.params.id)
    .then(situacao => {
      if (!situacao) res.status(404).send("Not Found")

      models.PessoaSitClinica.destroy({
        where: { id: req.params.id }
      })
      .then(situacao => {
        res.status(200).send({success: true})
      })
      .catch(err => res.status(500).send({error: err}))
    })
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /pessoas-sit-clinicas/:id:
 *    put:
 *      description: Atualiza uma situação
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id_pessoa
 *          description: ID da pessoa
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: tipo
 *          description: Tipo situação clinica
 *          in: formData
 *          required: true
 *          type: string
 *        - name: descricao
 *          description: Descrição situação clinica
 *          required: true
 *          type: string 
 *        - name: dt_inicio
 *          description: data inicial sitituação
 *          required: true
 *          type: date
 *        - name: desc_inicio
 *          description: Descrição inicial sitituação
 *          required: true
 *          type: string
 *        - name: desc_tratamentos_anteriores
 *          description: Descrição tratamentos anteriores
 *          required: true
 *          type: string 
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a atualização da situação
 *        404:
 *          description: situação não encontrada
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.put('/:id', security.verifyJWT,function (req, res) {
    models.PessoaSitClinica.findById(req.params.id)
    .then(situacao => {
        if (!situacao) res.status(404).send("Not Found")

        situacao.updateAttributes(req.body)

        res.status(200).send(situacao)

    })
    .catch(err => {
      console.log(err)
      res.status(500).send({error: err})
    })
});

module.exports = router;
