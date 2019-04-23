const security = require('../helpers/security')
const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /especialidades-profissional:
 *    post:
 *      description: Insere uma nova especialidade de profissional
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: descricao
 *          description: Descrição da especialidade
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a nova especialidade
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.post('/', security.verifyJWT, function (req, res) {
    models.EspecialidadeProfissional.create(req.body)
        .then(especialidade => res.status(200).send(especialidade))
        .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * definitions:
 *   EspecialidadeProfissional:
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
 * /especialidades-profissional:
 *    get:
 *      description: Retorna todas as especialidades de profissionais de saúde cadastradas
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Lista de especialidades de profissionais
 *          schema:
 *            $ref: '#/definitions/EspecialidadeProfissional'
 *        500:
 *          description: Erro que não foi possível recuperar as especialidades
 */
router.get('/', security.verifyJWT, function (req, res) {
    models.EspecialidadeProfissional.findAll()
    .then(especialidades => res.status(200).send(especialidades))
    .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * /especialidades-profissional/:id:
 *    get:
 *      description: Retorna uma especialidade de profissional pelo id
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com a especialidade de profissional
 *        404:
 *          description: Especialidade não encontrada
 *        500:
 *          description: Erro que não foi possível buscar a especialidade
 */
router.get('/:id', security.verifyJWT, function (req, res) {
    models.EspecialidadeProfissional.findById(req.params.id)
    .then(especialidade =>
      {
        if (!especialidade) res.status(404).send("Not Found");
        res.status(200).send(especialidade)
      }
    )
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /especialidades-profissional/:id:
 *    delete:
 *      description: Excluí uma especialidade de profissional
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com mensagem de sucesso
 *        404:
 *          description: Especialidade não encontrada
 *        500:
 *          description: Erro que não foi possível excluir a especialidade
 */
router.delete('/:id', security.verifyJWT, function (req, res) {
    models.EspecialidadeProfissional.findById(req.params.id)
    .then(especialidade => {
      if (!especialidade) res.status(404).send("Not Found")

      models.EspecialidadeProfissional.destroy({
        where: { id: req.params.id }
      })
      .then(especialidade => {
        res.status(200).send({success: true})
      })
      .catch(err => res.status(500).send({error: err}))
    })
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /especialidades-profissional/:id:
 *    put:
 *      description: Atualiza uma especialidade de profissional
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: descricao
 *          description: Descrição da especialidade
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a atualização da especialidade
 *        404:
 *          description: Especialidade não encontrada
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.put('/:id', security.verifyJWT,function (req, res) {
    models.EspecialidadeProfissional.findById(req.params.id)
    .then(especialidade => {
        if (!especialidade) res.status(404).send("Not Found")

        especialidade.updateAttributes(req.body)

        res.status(200).send(especialidade)

    })
    .catch(err => {
      console.log(err)
      res.status(500).send({error: err})
    })
});

module.exports = router;
