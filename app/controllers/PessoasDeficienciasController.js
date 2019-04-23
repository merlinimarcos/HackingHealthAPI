const security = require('../helpers/security')
const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /pessoas-deficiencias:
 *    post:
 *      description: Insere uma nova deficiência para uma pessoa
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id_pessoa
 *          description: ID da pessoa para inserir a deficiência
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: tipo
 *          description: Tipo da deficiência
 *          in: formData
 *          required: true
 *          type: string
 *        - name: descricao
 *          description: Descrição da deficiência
 *          in: formData
 *          required: true
 *          type: string 
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a deficiência de uma pessoa
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.post('/', security.verifyJWT, function (req, res) {
    models.PessoaDeficiencia.create(req.body)
        .then(deficiencia => res.status(200).send(deficiencia))
        .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * definitions:
 *   PessoaDeficiencia:
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
 * /pessoas-deficiencias:
 *    get:
 *      description: Retorna todas as deficiências cadastradas, podendo ser filtrada por pessoa pelo query param ?id_pessoa
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Lista de deficiências
 *          schema:
 *            $ref: '#/definitions/PessoaDeficiencia'
 *        500:
 *          description: Erro que não foi possível recuperar as deficiências
 */
router.get('/', security.verifyJWT, function (req, res) {
    let id_pessoa = req.query.id_pessoa;
    let query = {}

    if (id_pessoa > 0)
        query = {where: {id_pessoa: id_pessoa}}

    models.PessoaDeficiencia.findAll(query)
    .then(deficiencias => res.status(200).send(deficiencias))
    .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * /pessoas-deficiencias/:id:
 *    get:
 *      description: Retorna uma deficiência pelo id
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com a deficiência
 *        404:
 *          description: Deficiência não encontrada
 *        500:
 *          description: Erro que não foi possível buscar a deficiência
 */
router.get('/:id', security.verifyJWT, function (req, res) {
    models.PessoaDeficiencia.findById(req.params.id)
    .then(deficiencia =>
      {
        if (!deficiencia) res.status(404).send("Not Found");
        res.status(200).send(deficiencia)
      }
    )
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /pessoas-deficiencias/:id:
 *    delete:
 *      description: Excluí uma deficiência
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com mensagem de sucesso
 *        404:
 *          description: deficiência não encontrada
 *        500:
 *          description: Erro que não foi possível excluir a deficiência
 */
router.delete('/:id', security.verifyJWT, function (req, res) {
    models.PessoaDeficiencia.findById(req.params.id)
    .then(deficiencia => {
      if (!deficiencia) res.status(404).send("Not Found")

      models.PessoaDeficiencia.destroy({
        where: { id: req.params.id }
      })
      .then(deficiencia => {
        res.status(200).send({success: true})
      })
      .catch(err => res.status(500).send({error: err}))
    })
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /pessoas-deficiencias/:id:
 *    put:
 *      description: Atualiza uma deficiência
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id_pessoa
 *          description: ID da pessoa para atualizar a deficiência
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: tipo
 *          description: Tipo da deficiência
 *          in: formData
 *          required: true
 *          type: string
 *        - name: descricao
 *          description: Descrição da deficiência
 *          in: formData
 *          required: true
 *          type: string 
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a atualização da deficiência
 *        404:
 *          description: deficiencia não encontrada
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.put('/:id', security.verifyJWT,function (req, res) {
    models.PessoaDeficiencia.findById(req.params.id)
    .then(deficiencia => {
        if (!deficiencia) res.status(404).send("Not Found")

        deficiencia.updateAttributes(req.body)

        res.status(200).send(deficiencia)

    })
    .catch(err => {
      console.log(err)
      res.status(500).send({error: err})
    })
});

module.exports = router;
