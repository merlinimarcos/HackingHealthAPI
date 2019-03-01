const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Bpmn = require('bpmn-engine');
const EventEmitter = require('events').EventEmitter;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const models = require('../models');


/**
 * @swagger
 * definitions:
 *   Processo:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       id_modeloprocesso:
 *         type: integer
 *       descricao:
 *         type: string
 *       json_instancia_processo:
 *         type: string
 *       data_criacao: 
 *         type: date
 *       finalizado:
 *         type: boolean
 * 
 * /processos:
 *    get:
 *      description: Retorna todos os processos instanciados e não finalizados
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Lista de processos
 *          schema:
 *            $ref: '#/definitions/Processo'
 *        500:
 *          description: Erro que não foi possível recuperar processos
 */
router.get('/', function (req, res) {
    models.Processo.findAll({
        where: {
            finalizado: false
        }
    })
    .then(processos => res.status(200).send(processos))
    .catch(err => res.status(500).send({message: "Não foi possível recuperar os dados dos modelos de processos.", error : err}));
});


/**
 * @swagger
 * 
 * /processos/novo:
 *    post:
 *      description: Inicia um novo processo a partir de um modelo
 *      parameters:
 *        - name: idmodeloprocesso
 *          description: ID de um modelo de processo existente
 *          in: formData
 *          required: true
 *          type: integer
 *        - name: descricao
 *          description: Descrição do processo
 *          in: formData
 *          required: true
 *          type: string
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON contendo dados do processo criado
 *        500:
 *          description: Erro que não foi possível criar uma nova instancia do processo
 */
router.post('/novo', function (req, res) {
    models.ModeloProcesso.findAll({
        where: {
            id: req.body.idmodeloprocesso
        }
    }).then(data => {
        modeloprocesso = data[0].dataValues;
        const engine = new Bpmn.Engine({
            name: modeloprocesso.descricao,
            source: modeloprocesso.xml_camunda,
            moddleOptions: {
                camunda: require('camunda-bpmn-moddle/resources/camunda')
            }
        });

        var state = null;
        
        const listener = new EventEmitter();
        
        listener.once('start', (activity) => {

            state = engine.getState();

            models.Processo.create({
                ModeloProcessoId: modeloprocesso.id,
                descricao : req.body.descricao,
                json_instancia_processo : JSON.stringify(state),
                data_criacao : new Date(),
                finalizado : false
            })
            .then(processos => {
                res.status(200).send(processos);
            }).catch(err => res.status(500).json({message: "Não foi possível persistir o novo processo", error : err}));

        });
        

        engine.execute({
            listener: listener
            }, (err, execution) => {
                if (err) throw err;
        });
    }).catch(function(err){
        console.log(err);
        res.status(500).send({message: "Não foi possível recuperar os dados dos modelos de processos.", error : err});
    });
});


/**
 * @swagger
 * 
 * /processos/passo/{id}:
 *    get:
 *      description: Retorna dados sobre o passo atual dentro da instancia do processo
 *      parameters:
 *        - name: id
 *          description: ID da instancia do processo
 *          in: path
 *          required: true
 *          type: integer
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON contendo dados do passo atual do processo
 *        500:
 *          description: Erro que não foi possível recuperar o passo atual do processo
 */
router.get('/passo/:id', function (req, res) {
    models.Processo.findAll({
        where: {
            id: req.params.id
        }
    }).then(data => {
        var processo = data[0].dataValues;
        var state = JSON.parse(processo.json_instancia_processo);
        
        Bpmn.Engine.resume(state,{moddleOptions: {
            camunda: require('camunda-bpmn-moddle/resources/camunda')
        }},(err,newEngine) => {
        
            if (err) throw err;
            const listener = new EventEmitter();

            newEngine.once('end', () => {
                console.debug('FIM DO WORKFLOW OU STOP()');
                //LER https://github.com/paed01/bpmn-engine/issues/43
                       
            });

            listener.on('end', (task, instance) => {
                console.debug('EVENTO end  ', task.id, task.type);
                if(task.type == "bpmn:EndEvent"){
                    res.status(200).json({
                        status:"finalizado",
                        task: task.id,
                        type: task.type
                    });
                }
            });

            listener.on('wait', (task,instance) => {
                console.log("EVENTO wait " + task.id);
            
                //var process = task.parentContext.moddleContext.rootHandler.element.rootElements.find(c => c.$type === 'bpmn:Process');
                //console.log(process.laneSets[0].lanes);
                //console.log(task.parentContext);

                var inputoutput = task.activity.extensionElements.values[0];
                var flagcontinue = true;
                if(inputoutput['inputParameters'] != undefined){
                    for(var i=0;i<inputoutput['inputParameters'].length;i++){
                        var item = inputoutput['inputParameters'][i];
                        if(item.name == "done" && item['value'] == "true"){
                            console.log("VARIAVEL DONE TRUE -> CONTINUANDO");
                            flagcontinue = false;
                            instance.signal(task.id);
                        }
                    }
                }
                if(flagcontinue){
                    if (task.type === 'bpmn:UserTask') {
                        console.log("TASK EM WAIT - " + task.id);  
                        newEngine.stop();
                        
                        res.status(200).json({
                            status:"em execução",
                            task: task.id,
                            type: task.type
                        });

                    }
                }
            });
        
            listener.on('error', (err, eventSource) => {
                console.debug('EVENTO error ', err);
            });
        
            newEngine.execute({
                listener: listener
            }, (err, instance) => {
                console.log("RODANDO PROCESSO...");
                if (err) throw err;
            });
        });
    }).catch(function(err){
        console.log(err);
        res.status(500).send({message: "Não foi possível recuperar os dados dos modelos de processos.", error : err});
    });
});

/**
 * @swagger
 * 
 * /processos/passorealizado:
 *    post:
 *      description: Marca como feito um passo do processo
 *      parameters:
 *        - name: id
 *          description: ID da instancia do processo
 *          in: formData
 *          required: true
 *          type: integer
  *        - name: status
 *          description: true - realizado / false - não realizado
 *          in: formData
 *          required: true
 *          type: boolean
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Objeto JSON contendo dados do passo atual do processo
 *        500:
 *          description: Erro que não foi possível recuperar o passo atual do processo
 */
router.post('/passorealizado', function (req, res) {
    models.Processo.findAll({
        where: {
            id: req.body.id
        }
    }).then(data => {
        var processo = data[0].dataValues;
        var state = JSON.parse(processo.json_instancia_processo);
        
        Bpmn.Engine.resume(state,{moddleOptions: {
            camunda: require('camunda-bpmn-moddle/resources/camunda')
        }},(err,newEngine) => {
        
            if (err) throw err;
            const listener = new EventEmitter();

            newEngine.once('end', () => {
                console.debug('FIM DO WORKFLOW OU STOP()');
                //LER https://github.com/paed01/bpmn-engine/issues/43
                console.log("SALVANDO NO BANCO");
                var newState = newEngine.getState();
                
                state.definitions = [];
                state.definitions.push(newState);
                
                data.forEach(function(t) {
                    console.log("UPDATE!!!");
                    t.update({
                        json_instancia_processo: JSON.stringify(state)
                    }).then(function(err) {
                        res.status(200).json({});
                    });
                });        
            });

            listener.on('end', (task, instance) => {
                console.debug('EVENTO end  ', task.id, task.type);
                if(task.type == "bpmn:EndEvent"){
                    data.forEach(function(t) {
                        console.log("UPDATE!!!");
                        t.update({
                            json_instancia_processo: JSON.stringify(state),
                            finalizado: true
                        }).then(function(err) {
                            res.status(200).json({
                                status:"finalizado",
                                task: task.id,
                                type: task.type
                            });
                        });
                    });
                }
            });

        
            listener.on('wait', (task,instance) => {
                console.log("EVENTO wait " + task.id);
            
                //var process = task.parentContext.moddleContext.rootHandler.element.rootElements.find(c => c.$type === 'bpmn:Process');
                //console.log(process.laneSets[0].lanes);
                //console.log(task.parentContext);

                var inputoutput = task.activity.extensionElements.values[0];
                var flagcontinue = true;
                if(inputoutput['inputParameters'] != undefined){
                    for(var i=0;i<inputoutput['inputParameters'].length;i++){
                        var item = inputoutput['inputParameters'][i];
                        if(item.name == "done" && item['value'] == "true"){
                            console.log("VARIAVEL DONE TRUE -> CONTINUANDO");
                            flagcontinue = false;
                            instance.signal(task.id);
                        }
                    }
                }
                if(flagcontinue){
                    if (task.type === 'bpmn:UserTask') {
                        console.log("TASK EM WAIT - " + task.id);

                        if(req.body.status == "true"){
                            if(inputoutput['inputParameters'] != undefined){

                                for(var i=0;i<inputoutput['inputParameters'].length;i++){
                                    var item = inputoutput['inputParameters'][i];
                                    if(item.name == "done"){
                                        console.log("DONE = TRUE");
                                        item.value = "true";
                                    }
                                }
                            }
                        }

                        newEngine.stop();

                    }
                }
            });
        
            listener.on('error', (err, eventSource) => {
                console.debug('EVENTO error ', err);
            });
        
            newEngine.execute({
                listener: listener
            }, (err, instance) => {
                console.log("RODANDO PROCESSO...");
                if (err) throw err;
            });
        });
    }).catch(function(err){
        console.log(err);
        res.status(500).send({message: "Não foi possível recuperar os dados dos modelos de processos.", error : err});
    });
});

module.exports = router;