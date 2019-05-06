const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/**
 * @swagger
 * /login:
 *    post:
 *      description: Realiza a autenticação de um usuário
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
 *      responses:
 *        200:
 *          description: Objeto JSON com Token JWT
 *        403:
 *          description: Login inválido
 *        500:
 *          description: Erro que não foi recuperar dados
 */
router.post('/', function (req, resp) {
    models.Usuario.findOne({ where : {
            login : req.body.login,
        }})
        .then(usuario => {
            if (!usuario || !bcrypt.compareSync(req.body.senha, usuario.senha))
                resp.status(403).send({ error: "Login inválido!" });

            const id = usuario.id;
            var token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 5000 
        });

        resp.status(200).send({ auth: true, token: token });

        })
        .catch(err => {
          resp.status(500).send({error: err})
        })
})

module.exports = router;
