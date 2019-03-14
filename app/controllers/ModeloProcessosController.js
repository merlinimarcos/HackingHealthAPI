const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const models = require('../models');


/**
 * @swagger
 * definitions:
 *   ModeloProcesso:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       descricao:
 *         type: string
 *       xml_camunda:
 *         type: string
 *       data_criacao: 
 *         type: date
 *       data_validade: 
 *         type: date
 *       habilitado:
 *         type: boolean
 * 
 * /modeloprocessos:
 *    get:
 *      description: Retorna todos os modelos de processos
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Lista de modelos de processos
 *          schema:
 *            $ref: '#/definitions/ModeloProcesso'
 *        500:
 *          description: Erro que não foi possível recuperar modelos de processos
 */
router.get('/', function (req, res) {
    models.ModeloProcesso.findAll()
    .then(modeloprocessos => res.status(200).send(modeloprocessos))
    .catch(err => res.status(500).send({message: "Não foi possível recuperar os dados dos modelos de processos.", error : err}));
})


/**
 * @swagger
 * /modeloprocessos:
 *    post:
 *      description: Insere um novo modelo de processo no sistema contendo o XML gerado pelo Camunda BPM Modeler
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: descricao
 *          description: Descrição do processo
 *          in: formData
 *          required: true
 *          type: string
 *        - name: xml_camunda
 *          description: Modelo BPMN em formato XML 
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Objeto JSON que representa o novo modelo de processo
 *        500:
 *          description: Erro que não foi possível recuperar modelos de processos
 */
router.post('/', function (req, res) {
    models.ModeloProcesso.create({
            descricao : req.body.descricao,
            xml_camunda : req.body.xml_camunda,
            data_criacao : new Date(),
            data_validade :  new Date('9999-12-31'),
            habilitado : true
        })
        .then(modeloprocessos => {
            res.status(200).send(modeloprocessos)
          }
        )
        .catch(err => res.status(500).json({message: "Não foi possível criar o novo modelo de processo", error : err}));
});

module.exports = router;