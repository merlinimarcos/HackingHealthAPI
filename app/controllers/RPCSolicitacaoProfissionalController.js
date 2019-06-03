const express = require('express');
const router = express.Router();
const models = require('../models');
const security = require('../helpers/security')
const { check, validationResult } = require('express-validator/check');
const validators = [
  check('descricao').isLength({ min: 1 }).withMessage('Campo Justificativa é obrigatório'),
  check('data_inicial_periodo_necessidade').custom(isValidDate).withMessage('Data inicial período de necessidade inválida'),
  check('data_final_periodo_necessidade').custom(isValidDate).withMessage('Data final período de necessidade inválida'),
  check('custo_estimado').optional().isDecimal().withMessage('O custo estimado deve ser um valor decimal'),
  check('id_especialidade').not().isEmpty().withMessage("Selecione ao menos uma especialidade"),
  check('id_tipo_acao').not().isEmpty().withMessage("Selecione ao menos um tipo de ação")
] 


router.post('/', validators, security.verifyJWT, function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    
    let data = {
      descricao: req.body.descricao,
      tipo_solicitacao: 3,
      id_usuario: req.userId,
      dt_solicitacao: new Date().toISOString()
    }

    models.Solicitacao.create(data)
    .then(solicitacao => {        
        let dataNecessidadeInicioSplit = req.body.data_inicial_periodo_necessidade.split("/");
        let dataNecessidadeInicio = dataNecessidadeInicioSplit[2]+'-'+dataNecessidadeInicioSplit[1]+'-'+dataNecessidadeInicioSplit[0];
        let dataNecessidadeFinalSplit = req.body.data_final_periodo_necessidade.split("/");
        let dataNecessidadeFinal = dataNecessidadeFinalSplit[2]+'-'+dataNecessidadeFinalSplit[1]+'-'+dataNecessidadeFinalSplit[0];
        
        let data = {
          id: solicitacao.id,           
          outra_especialidade: req.body.outra_especialidade,
          outra_acao: req.body.outra_acao,
          data_inicial_periodo_necessidade: dataNecessidadeInicio,
          data_final_periodo_necessidade: dataNecessidadeFinal,
          custo_estimado: req.body.custo_estimado,
          justificativa_valor: req.body.justificativa_valor          
        }

        models.SolicitacaoProfissional.create(data)
        .then(solicitacaoProfissional => {
          let data = {
            id_solicitacao: solicitacaoProfissional.id,
            id_status: 1,
            id_usuario: req.userId,
            feedback: "",
            data_status: new Date().toISOString(),
            concluido: req.body.concluido
          }
          models.StatusAtualSolicitacao.create(data)

          let id_especialidade = req.body.id_especialidade;
          let id_tipo_acao = req.body.id_tipo_acao;

          id_especialidade.map( e => {
            models.SolicitacaoProfissionalEspecialidades.create({id_solicitacao: solicitacaoProfissional.id, id_especialidade: e})
          })

          id_tipo_acao.map( a => {
            models.SolicitacaoProfissionalAcoes.create({id_solicitacao: solicitacaoProfissional.id, id_acao: a})
          })
          
          
          res.status(200).send(solicitacaoProfissional)
        })
        .catch(err => res.status(500).send({error: err}))
    }).catch(err => res.status(500).send({error: err}))
})


router.get('/', function (req, res) {
    models.SolicitacaoProfissional.findAll({include: [{
      model: models.Solicitacao,
      include: [{
          model: models.Usuario,
          attributes: ["login","id_rede", "id_instituicao"]
      }, {
        model: models.TipoSolicitacao
      }]
    }, {
      model: models.EspecialidadeProfissional
    }, {
      model: models.TipoDeAcaoProfissional
    }]})
    .then(solicitacaoProfissional => res.status(200).send(solicitacaoProfissional))
    .catch(err => res.status(500).send(err))
})

router.get('/:id', function (req, res) {
    models.SolicitacaoProfissional.findById(req.params.id, {include: [{
      model: models.Solicitacao,
      model: models.EspecialidadeProfissional,
      model: models.TipoDeAcaoProfissional,
      include: [{
          model: models.Usuario,
          attributes: ["login","id_rede", "id_instituicao"]
      }, {
        model: models.TipoSolicitacao
      }]
    }]})
    .then(solicitacaoProfissional =>
      {
        if (!solicitacaoProfissional) res.status(404).send("Not Found");
        res.status(200).send(solicitacaoProfissional)
      }
    )
    .catch(err => res.status(500).send({error: err}))
});

router.delete('/:id', function (req, res) {
    models.SolicitacaoProfissional.findById(req.params.id)
    .then(solicitacaoProfissional => {
      if (!solicitacaoProfissional) res.status(404).send("Not Found")

      models.SolicitacaoProfissional.destroy({
        where: { id: req.params.id }
      })
      .then(solicitacaoProfissional => {
        res.status(200).send({success: true})
      })
      .catch(err => res.status(500).send({error: err}))
    })
    .catch(err => res.status(500).send({error: err}))
});

router.put('/:id', validators,function (req, res) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  models.Solicitacao.findById(req.params.id)
  .then(solicitacao => {
      if (!solicitacao) res.status(404).send("Not Found")

      let data = {
        descricao: req.body.descricao,
      }

      solicitacao.updateAttributes(data)

      models.SolicitacaoProfissional.findById(req.params.id)
      .then(solicitacaoProfissional => {

        if (!solicitacaoProfissional) res.status(404).send("Not Found")

        let dataNecessidadeInicioSplit = req.body.data_inicial_periodo_necessidade.split("/");
        let dataNecessidadeInicio = dataNecessidadeInicioSplit[2]+'-'+dataNecessidadeInicioSplit[1]+'-'+dataNecessidadeInicioSplit[0];
        let dataNecessidadeFinalSplit = req.body.data_final_periodo_necessidade.split("/");
        let dataNecessidadeFinal = dataNecessidadeFinalSplit[2]+'-'+dataNecessidadeFinalSplit[1]+'-'+dataNecessidadeFinalSplit[0];
        
        let data = {
          id: solicitacao.id,           
          outra_especialidade: req.body.outra_especialidade,
          outra_acao: req.body.outra_acao,
          data_inicial_periodo_necessidade: dataNecessidadeInicio,
          data_final_periodo_necessidade: dataNecessidadeFinal,
          custo_estimado: req.body.custo_estimado,
          justificativa_valor: req.body.justificativa_valor          
        }

        solicitacaoProfissional.updateAttributes(data)
        models.StatusAtualSolicitacao.findOne({where: {id_solicitacao: solicitacao.id}}).then(statusSolicitacao => {
          statusSolicitacao.updateAttributes({concluido: req.body.concluido})
        })
       
        res.status(200).send(solicitacaoProfissional)
      })
      .catch(err => res.status(500).send({error: err}))
  }).catch(err => res.status(500).send({error: err}))
});

function isValidDate(dateString)
{
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    return day > 0 && day <= monthLength[month - 1];
};

module.exports = router;