const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const models = require('../models');

// Criar um novo usuario
router.post('/', function (req, res) {
    models.Usuario.create({
            login : req.body.login,
            senha: req.body.senha          
        })
        .then(usuario => {
            usuario.setPessoa(req.body.pessoa)
            usuario.addPerfil(req.body.perfis)
            res.status(200).send(usuario)
          }
        )
        .catch(err => {
          console.log(err)
          res.status(500).send("Houve um problema ao adicionar os dados no banco de dados.")}
        )
})

// retornar todos os usuários
router.get('/', function (req, res) {
    models.Usuario.findAll({
        include: [{
          model: models.Perfil,
        }]
      })
    .then(usuarios => res.status(200).send(usuarios))
    .catch(err => res.status(500).send("Existe um problema para buscar os usuarios."))
})

// Buscar um único usuário na base de dados
router.get('/:id', function (req, res) {
    models.Usuario.findById(req.params.id,
      {
        include: [{
          model: models.Perfil,
        }]
      })
    .then(usuario =>
      {
        if (!usuario) res.status(404).send("Usuario não encontrado.");
        res.status(200).send(usuario)
      }
    )
    .catch(err => res.status(500).send("Existe um problema ao buscar o usuario."))
});

// Excluir um usuario
router.delete('/:id', function (req, res) {
    models.Usuario.findById(req.params.id)
    .then(usuario => {
      if (!usuario) res.status(404).send("Usuario não encontrado.")
      const usuarioExcluido = usuario

      models.Usuario.destroy({
        where: { id: req.params.id }
      })
      .then(usuario => {
        res.status(200).send("Usuário: "+ usuarioExcluido.login +" foi excluído.")
      })
      .catch(err => res.status(500).send("Houve um problema ao excluir o usuário"))
    })
    .catch(err => res.status(500).send("Existe um problema ao buscar o usuário."))
});

// Atualizar um único usuário
router.put('/:id', function (req, res) {
    models.Usuario.findById(req.params.id)
    .then(usuario => {
        if (!usuario) res.status(404).send("Usuário não encontrado.")

        usuario.updateAttributes({
          login: req.body.login
        })

        usuario.setPerfils()
        usuario.addPerfil(req.body.perfis)
        res.status(200).send(usuario)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send("Houve um problema ao atualizar o usuário.")
    })
});

module.exports = router;
