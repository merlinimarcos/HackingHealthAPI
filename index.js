const express = require('express')
const bodyParser = require('body-parser')
const app = express()

var PerfisController = require('./app/controllers/PerfisController')
var UsuariosController = require('./app/controllers/UsuariosController')
var PessoasController = require('./app/controllers/PessoasController')

var swaggerUi = require('swagger-ui-express');
var swaggerJSDoc = require("swagger-jsdoc");
var PerfisController = require('./app/controllers/PerfisController');
var UsuariosController = require('./app/controllers/UsuariosController');
var ModeloProcessosController = require('./app/controllers/ModeloProcessosController');
var ProcessosController = require('./app/controllers/ProcessosController');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var swaggerDefinition = {
    info: {
      title: 'API Sistema SHRINERS',
      version: '1.0.0',
      description: 'Documentação da API do sistema Shriners',
    },
    host: 'localhost:3000',
    basePath: '/',
  };
  var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./app/controllers/*.js'],
  };
var swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/pessoas', PessoasController)
app.use('/perfis', PerfisController);
app.use('/usuarios', UsuariosController);
app.use('/modeloprocessos', ModeloProcessosController);
app.use('/processos', ProcessosController);


app.listen(3000)
