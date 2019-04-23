const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');

// Criar um novo usuario
router.post('/', function (req, res) {
    let hash = bcrypt.hashSync(req.body.senha, 10);

    models.Usuario.create({
            id: req.body.id,
            login : req.body.login,
            senha: hash,
            id_rede: req.body.id_rede,
            id_instituicao: req.body.id_instituicao,
            data_ult_acesso: null           
        })
        .then(usuario => {
            //usuario.setPessoa(req.body.pessoa)
            //usuario.addPerfil(req.body.perfis)
            res.status(200).send(usuario)
          }
        )
        .catch(err => {
          console.log(err)
          res.status(500).send({error: err})}
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
    .catch(err => res.status(500).send({error: err}))
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
    .catch(err => res.status(500).send({error: err}))
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
      .catch(err => res.status(500).send({error: err}))
    })
    .catch(err => res.status(500).send({error: err}))
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
      res.status(500).send({error: err})
    })
});

module.exports = router;
