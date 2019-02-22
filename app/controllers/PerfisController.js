const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const models = require('../models');

// Criar um novo perfil
router.post('/', function (req, res) {
    models.Perfil.create({
            descricao : req.body.descricao
        })
        .then(perfil => res.status(200).send(perfil))
        .catch(err => res.status(500).send("Houve um problema ao adicionar os dados no banco de dados."))
})

// retornar todos os perfis
router.get('/', function (req, res) {
    models.Perfil.findAll()
    .then(perfis => res.status(200).send(perfis))
    .catch(err => res.status(500).send("Existe um problema para buscar os perfis."))
})

// Buscar um único perfil na base de dados
router.get('/:id', function (req, res) {
    models.Perfil.findById(req.params.id)
    .then(perfil =>
      {
        if (!perfil) res.status(404).send("Perfil não encontrado.");
        res.status(200).send(perfil)
      }
    )
    .catch(err => res.status(500).send("Existe um problema ao buscar o perfil."))
});

// Excluir um perfil
router.delete('/:id', function (req, res) {
    models.Perfil.findById(req.params.id)
    .then(perfil => {
      if (!perfil) res.status(404).send("Perfil não encontrado.")
      const perfilExcluido = perfil

      models.Perfil.destroy({
        where: { id: req.params.id }
      })
      .then(perfil => {
        res.status(200).send("Perfil: "+ perfilExcluido.descricao +" foi excluído.")
      })
      .catch(err => res.status(500).send("Houve um problema ao excluir o perfil"))
    })
    .catch(err => res.status(500).send("Existe um problema ao buscar o perfil."))
});

// Atualizar um único perfil
router.put('/:id', function (req, res) {
    models.Perfil.findById(req.params.id)
    .then(perfil => {
        if (!perfil) res.status(404).send("Perfil não encontrado.")

        perfil.updateAttributes({
          descricao: req.body.descricao
        })

        res.status(200).send(perfil)

    })
    .catch(err => {
      console.log(err)
      res.status(500).send("Houve um problema ao atualizar o perfil.")
    })
});

module.exports = router;
