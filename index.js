const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var PerfisController = require('./app/controllers/PerfisController');
var UsuariosController = require('./app/controllers/UsuariosController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/perfis', PerfisController);
app.use('/usuarios', UsuariosController);

app.listen(3000)
