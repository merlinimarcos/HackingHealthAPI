const security = require('../helpers/security')
const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /pessoas-telefones:
 *    post:
 *      description: Insere um novo telefone para uma pessoa
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id_pessoa
 *          description: ID da pessoa para inserir o telefone
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: tipo
 *          description: tipo de telefone
 *          in: formData
 *          required: true
 *          type: string
 *        - name: numero
 *          description: numero do telefone
 *          in: formData
 *          required: true
 *          type: string 
 *        - name: ddd
 *          description: ddd do telefone
 *          in: formData
 *          required: true
 *          type: string
 *        - name: proprietario
 *          description: proprietario do telefone
 *          in: formData
 *          required: true
 *          type: string  
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a telefone de uma pessoa
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.post('/', security.verifyJWT, function (req, res) {
    models.PessoaTelefone.create(req.body)
        .then(telefone => res.status(200).send(telefone))
        .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * definitions:
 *   PessoaTelefone:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       id_pessoa:
 *         type: integer
 *       tipo:
 *         type: string
 *       numero:
 *         type: string
 *       ddd:
 *         type: string
 *       proprietario:
 *         type: string
 *       createdAt: 
 *         type: date
 *       updatedAt: 
 *         type: date
 * 
 * /pessoas-telefones:
 *    get:
 *      description: Retorna todas os telefones cadastrados, podendo ser filtrado por pessoa pelo query param ?id_pessoa
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Lista de telefones
 *          schema:
 *            $ref: '#/definitions/PessoaTelefone'
 *        500:
 *          description: Erro que não foi possível recuperar os telefones
 */
router.get('/', security.verifyJWT, function (req, res) {
    let id_pessoa = req.query.id_pessoa;
    let query = {}

    if (id_pessoa > 0)
        query = {where: {id_pessoa: id_pessoa}}

    models.PessoaTelefone.findAll(query)
    .then(telefones => res.status(200).send(telefones))
    .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * /pessoas-telefones/:id:
 *    get:
 *      description: Retorna um telefone pelo id
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com o telefone
 *        404:
 *          description: telefone não encontrada
 *        500:
 *          description: Erro que não foi possível buscar o telefone
 */
router.get('/:id', security.verifyJWT, function (req, res) {
    models.PessoaTelefone.findById(req.params.id)
    .then(telefone =>
      {
        if (!telefone) res.status(404).send("Not Found");
        res.status(200).send(telefone)
      }
    )
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /pessoas-telefones/:id:
 *    delete:
 *      description: Excluí um telefone
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com mensagem de sucesso
 *        404:
 *          description: telefone não encontrado
 *        500:
 *          description: Erro que não foi possível excluir o telefone
 */
router.delete('/:id', security.verifyJWT, function (req, res) {
    models.PessoaTelefone.findById(req.params.id)
    .then(telefone => {
      if (!telefone) res.status(404).send("Not Found")

      models.PessoaTelefone.destroy({
        where: { id: req.params.id }
      })
      .then(telefone => {
        res.status(200).send({success: true})
      })
      .catch(err => res.status(500).send({error: err}))
    })
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /pessoas-telefones/:id:
 *    put:
 *      description: Atualiza um telefone
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id_pessoa
 *          description: ID da pessoa para atualizar o telefone
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: tipo
 *          description: tipo de telefone
 *          in: formData
 *          required: true
 *          type: string
 *        - name: numero
 *          description: numero do telefone
 *          in: formData
 *          required: true
 *          type: string 
 *        - name: ddd
 *          description: ddd do telefone
 *          in: formData
 *          required: true
 *          type: string
 *        - name: proprietario
 *          description: proprietario do telefone
 *          in: formData
 *          required: true
 *          type: string  
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a atualização do telefone
 *        404:
 *          description: telefone não encontrado
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.put('/:id', security.verifyJWT,function (req, res) {
    models.PessoaTelefone.findById(req.params.id)
    .then(telefone => {
        if (!telefone) res.status(404).send("Not Found")

        telefone.updateAttributes(req.body)

        res.status(200).send(telefone)

    })
    .catch(err => {
      console.log(err)
      res.status(500).send({error: err})
    })
});

module.exports = router;
