const security = require('../helpers/security')
const express = require('express');
const router = express.Router();
const models = require('../models');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', security.verifyJWT,function (req, res) {
    let wherePerfil = {}
    let whereUser = {}

    if (req.query.id_perfil != null) {
      wherePerfil = {id: req.query.id_perfil}
    }

    if (req.query.id_instituicao) {
      whereUser = {id_instituicao: req.query.id_instituicao}
    }
 
    models.Usuario.findAll({
        attributes: ["login","id_rede", "id_instituicao"],
        include: [{
          model: models.Perfil,
          where: wherePerfil
        }, {
          model: models.Pessoa
        }],
        
        where: whereUser
      })
    .then(usuario => res.status(200).send(usuario))
    .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * /usuarioscontroller:
 *    post:
 *      description: Insere um novo usuário no sistema
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: login
 *          description: Login do usuário
 *          in: formData
 *          required: true
 *          type: string
 *        - name: senha
 *          description: Senha do usuário 
 *          in: formData
 *          required: true
 *          type: string
 *        - name: id_rede
 *          description: Id da rede do usuário
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: id_instituicao
 *          description: Id da instituição do usuário 
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: data_ult_acesso
 *          description: Data do último acesso do usuário 
 *          in: formData
 *          required: true
 *          type: date
 *      responses:
 *        200:
 *          description: Objeto JSON que representa o novo usuário
 *        500:
 *          description: Erro que não foi possível cadastrar o novo usuário
 */
router.post('/', security.verifyJWT, function (req, res) {
  let hash = bcrypt.hashSync(req.body.senha, 10)
  
  models.Usuario.create({
    id: req.body.id,
    login: req.body.login,
    senha: hash,
    id_rede: req.body.id_rede,
    id_instituicao: req.body.id_instituicao,
    data_ult_acesso: null
  })
  .then(usuario => {
    res.status(200).send({ message: "Usuário cadastrado com sucesso!", usuario: usuario })
  })
  .catch(err => res.status(500).json({ message: "Não foi possível cadastrar o novo usuário.", error: err}));
});

module.exports = router;
