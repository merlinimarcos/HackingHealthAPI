const security = require('../helpers/security')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const models = require('../models');

/**
 * @swagger
 * /pessoas:
 *    post:
 *      description: Insere uma nova pessoa, podendo ser pessoa fisica, jurídica e usuário
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: nome
 *          description: Nome da pessoa
 *          in: formData
 *          required: true
 *          type: string
 *        - name: endereco
 *          description: Descrição do endereço
 *          in: formData
 *          required: true
 *          type: string
 *        - name: email
 *          description: E-mail da pessoa
 *          in: formData
 *          required: true
 *          type: string
 *        - name: cep
 *          description: CEP
 *          in: formData
 *          required: true
 *          type: string
 *        - name: cidade
 *          description: Id da Cidade dos correios
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: bairro
 *          description: Descrição do bairro
 *          in: formData
 *          required: true
 *          type: string
 *        - name: rua
 *          description: Descrição da rua
 *          in: formData
 *          required: true
 *          type: string
 *        - name: estado_civil
 *          description: Descrição do estado cívil da pessoa
 *          in: formData
 *          required: true
 *          type: string
 *        - name: end_numero
 *          description: Número do endereço
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: end_complemento
 *          description: Complemento do endereço
 *          in: formData
 *          required: true
 *          type: string
 *        - name: usuario
 *          description: Objeto JSON com os dados do usuário, se enviado todos os campos são requeridos {login  string, senha string, id_rede integer, id_instituicao integer}
 *          in: formData
 *          required: false
 *          type: Json
 *        - name: pessoaFisica
 *          description: Objeto JSON com os dados de pessoa física, se enviado todos os campos são requeridos ex { dt_nasc date, sexo string, estado_civil string, interprete string, idioma string, responsavel integer, reside_com integer, renda_familiar float, tipo_parto string, ano_mes_cadastro integer, sequencia_ano_cadastro integer, senha_consulta_solicitacao string, dt_ultima_consulta date}
 *          in: formData
 *          required: false
 *          type: Json
 *        - name: pessoaJuridica
 *          description: Objeto JSON com os dados da pessoa juridica, se enviado todos os campos são requeridos ex { cnpj string}
 *          in: formData
 *          required: false
 *          type: Json
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a nova especialidade
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.post('/', security.verifyJWT, function (req, res) {
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
          if (req.body.hasOwnProperty('usuario')) {
            let hash = bcrypt.hashSync(req.body.usuario.senha, 10)
            pessoa.createUsuario({
              id: pessoa.id,
              login : req.body.usuario.login,
              senha: hash,
              id_rede: req.body.usuario.id_rede,
              id_instituicao: req.body.usuario.id_instituicao,
              data_ult_acesso: null
          }).catch(err => res.status(500).send(err))
          }
          if (req.body.hasOwnProperty('pessoaFisica'))
            pessoa.createPessoaFisica(req.body.pessoaFisica).catch(err => res.status(500).send(err))
          if (req.body.hasOwnProperty('pessoaJuridica'))
            pessoa.createPessoaJuridica(req.body.pessoaJuridica).catch(err => res.status(500).send(err))
          res.status(200).send(pessoa)}
        )
        .catch(err => {
          console.log(err)
          res.status(500).send({error: err})

        })
})

/**
 * @swagger
 * definitions:
 *   Pessoa:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       nome:
 *         type: string
 *       endereco:
 *         type: string
 *       email:
 *         type: string
 *       cep:
 *         type: string
 *       cidade:
 *         type: integer
 *       bairro:
 *         type: string
 *       rua:
 *         type: string
 *       estado_civil:
 *         type: string
 *       end_numero:
 *         type: integer
 *       end_complemento:
 *         type: string
 *       Usuario:
 *         type: Json
 *       PessoaFisica:
 *         type: Json
 *       PessoaJuridica:
 *         type: Json
 *       createdAt:
 *         type: date
 *       updatedAt:
 *         type: date
 *
 * /pessoas:
 *    get:
 *      description: Retorna todas as pessoas cadastradas
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Lista de pessoas
 *          schema:
 *            $ref: '#/definitions/Pessoa'
 *        500:
 *          description: Erro que não foi possível recuperar as pessoas
 */
router.get('/', security.verifyJWT, function (req, res) {
    models.Pessoa.findAll({include: [
      {model: models.Usuario, required: false, attributes: ["login","id_rede", "id_instituicao"] },
      {model: models.PessoaFisica, required: false },
      {model: models.PessoaJuridica, required: false },
    ]})
    .then(pessoas => res.status(200).send(pessoas))
    .catch(err => res.status(500).send({error: err}))
})

/**
 * @swagger
 * /pessoas/:id:
 *    get:
 *      description: Retorna uma pessoa pelo id
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON a pessoa
 *        404:
 *          description: Pessoa não encontrada
 *        500:
 *          description: Erro que não foi possível buscar a pessoa
 */
router.get('/:id', security.verifyJWT, function (req, res) {
    models.Pessoa.findById(req.params.id, {include: [
      {model: models.Usuario, required: false, attributes: ["login","id_rede", "id_instituicao"] },
      {model: models.PessoaFisica, required: false },
      {model: models.PessoaJuridica, required: false },
    ]})
    .then(pessoa =>
      {
        if (!pessoa) res.status(404).send("Not Found.");
        res.status(200).send(pessoa)
      }
    )
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /pessoas/:id:
 *    delete:
 *      description: Excluí uma pessoas
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON com mensagem de sucesso
 *        404:
 *          description: Pessoa não encontrada
 *        500:
 *          description: Erro que não foi possível excluir a pessoa
 */
router.delete('/:id', security.verifyJWT, function (req, res) {
    models.Pessoa.findById(req.params.id)
    .then(pessoa => {
      if (!pessoa) res.status(404).send("Not Found.")

      models.Pessoa.destroy({
        where: { id: req.params.id }
      })
      .then(pessoa => {
        res.status(200).send({success: true})
      })
      .catch(err => res.status(500).send({error: err}))
    })
    .catch(err => res.status(500).send({error: err}))
});

/**
 * @swagger
 * /pessoas/:id:
 *    put:
 *      description: Atualiza um grupo de material
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: nome
 *          description: Nome da pessoa
 *          in: formData
 *          required: true
 *          type: string
 *        - name: endereco
 *          description: Descrição do endereço
 *          in: formData
 *          required: true
 *          type: string
 *        - name: email
 *          description: E-mail da pessoa
 *          in: formData
 *          required: true
 *          type: string
 *        - name: cep
 *          description: CEP
 *          in: formData
 *          required: true
 *          type: string
 *        - name: cidade
 *          description: Id da Cidade dos correios
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: bairro
 *          description: Descrição do bairro
 *          in: formData
 *          required: true
 *          type: string
 *        - name: rua
 *          description: Descrição da rua
 *          in: formData
 *          required: true
 *          type: string
 *        - name: estado_civil
 *          description: Descrição do estado cívil da pessoa
 *          in: formData
 *          required: true
 *          type: string
 *        - name: end_numero
 *          description: Número do endereço
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: end_complemento
 *          description: Complemento do endereço
 *          in: formData
 *          required: true
 *          type: string
 *        - name: usuario
 *          description: Objeto JSON com os dados do usuário, se enviado todos os campos são requeridos {login  string, senha string, id_rede integer, id_instituicao integer}
 *          in: formData
 *          required: false
 *          type: Json
 *        - name: pessoaFisica
 *          description: Objeto JSON com os dados de pessoa física, se enviado todos os campos são requeridos ex { dt_nasc date, sexo string, estado_civil string, interprete string, idioma string, responsavel integer, reside_com integer, renda_familiar float, tipo_parto string, ano_mes_cadastro integer, sequencia_ano_cadastro integer, senha_consulta_solicitacao string, dt_ultima_consulta date}
 *          in: formData
 *          required: false
 *          type: Json
 *        - name: pessoaJuridica
 *          description: Objeto JSON com os dados da pessoa juridica, se enviado todos os campos são requeridos ex { cnpj string}
 *          in: formData
 *          required: false
 *          type: Json
 *      responses:
 *        200:
 *          description: Objeto JSON que representa a atualização da pessoa
 *        404:
 *          description: Pessoa não encontrada
 *        500:
 *          description: Erro que não foi possível salvar os dados
 */
router.put('/:id', security.verifyJWT, function (req, res) {
    models.Pessoa.findById(req.params.id)
    .then(pessoa => {
        if (!pessoa) res.status(404).send("Not Found.")

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

        if (req.body.hasOwnProperty('pessoaJuridica'))
          pessoa.getPessoaJuridica()
            .then(pessoaJuridica => pessoaJuridica.updateAttributes(req.body.pessoaJuridica))

        if (req.body.hasOwnProperty('pessoaFisica'))
          pessoa.getPessoaFisica()
            .then(pessoaFisica => pessoaFisica.updateAttributes(req.body.pessoaFisica))

        if (req.body.hasOwnProperty('usuario')) {
          pessoa.getUsuario()
            .then(usuario => usuario.updateAttributes({
              id: pessoa.id,
              login : req.body.usuario.login,
              id_rede: req.body.usuario.id_rede,
              id_instituicao: req.body.usuario.id_instituicao,
          }))
        }

        res.status(200).send(pessoa)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({error: err})
    })
});

module.exports = router;
