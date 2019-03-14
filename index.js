const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var PerfisController = require('./app/controllers/PerfisController')
var UsuariosController = require('./app/controllers/UsuariosController')
var PessoasController = require('./app/controllers/PessoasController')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/pessoas', PessoasController)
app.use('/perfis', PerfisController)
app.use('/usuarios', UsuariosController)

app.listen(3000)
