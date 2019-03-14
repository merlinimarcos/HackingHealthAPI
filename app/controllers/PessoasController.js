const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const models = require('../models');

// Criar um nova pessoa
router.post('/', function (req, res) {

    models.Pessoa.create({
          nome: req.body.nome,
          endereco: req.body.endereco,
          email: req.body.email,
          cep: req.body.cep,
          cidade: req.body.cidade,
          bairro: req.body.bairro,
          rua: req.body.rua,
          estado_civil: req.body.estado_civil,
          end_numero: req.body.end_numero,
          end_complemento: req.body.end_complemento,
        })
        .then(pessoa => {
          pessoa.createUsuario(req.body.usuario)
          res.status(200).send(pessoa)}
        )
        .catch(err => {
          console.log(err)
          res.status(500).send("Houve um problema ao adicionar os dados no banco de dados.")

        })
})

// retornar todos as Pessoas
router.get('/', function (req, res) {
    models.Pessoa.findAll()
    .then(pessoas => res.status(200).send(pessoas))
    .catch(err => res.status(500).send("Existe um problema para buscar os pessoas."))
})

// Buscar um único pessoa na base de dados
router.get('/:id', function (req, res) {
    models.Pessoa.findById(req.params.id)
    .then(pessoa =>
      {
        if (!pessoa) res.status(404).send("Pessoa não encontrada.");
        res.status(200).send(pessoa)
      }
    )
    .catch(err => res.status(500).send("Existe um problema ao buscar a pessoa."))
});

// Excluir uma pessoa
router.delete('/:id', function (req, res) {
    models.Pessoa.findById(req.params.id)
    .then(pessoa => {
      if (!pessoa) res.status(404).send("Pessoa não encontrado.")
      const pessoaExcluida = pessoa

      models.Pessoa.destroy({
        where: { id: req.params.id }
      })
      .then(pessoa => {
        res.status(200).send("Pessoa: "+ pessoaExcluida.descricao +" foi excluída.")
      })
      .catch(err => res.status(500).send("Houve um problema ao excluir a pessoa"))
    })
    .catch(err => res.status(500).send("Existe um problema ao buscar a pessoa."))
});

// Atualizar uma única pessoa
router.put('/:id', function (req, res) {
    models.Pessoa.findById(req.params.id)
    .then(pessoa => {
        if (!pessoa) res.status(404).send("Pessoa não encontrada.")

        pessoa.updateAttributes({
          nome: req.body.nome,
          endereco: req.body.endereco,
          email: req.body.email,
          cep: req.body.cep,
          cidade: req.body.cidade,
          bairro: req.body.bairro,
          rua: req.body.rua,
          estado_civil: req.body.estado_civil,
          end_numero: req.body.end_numero,
          end_complemento: req.body.end_complemento,
        })

        res.status(200).send(pessoa)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send("Houve um problema ao atualizar a pessoa.")
    })
});

module.exports = router;
