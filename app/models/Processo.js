'use strict';
module.exports = (sequelize, DataTypes) => {
  const Processo = sequelize.define('Processo', {
    ModeloProcessoId: DataTypes.INTEGER,
    descricao: DataTypes.STRING,
    json_instancia_processo: DataTypes.JSON,
    data_criacao: DataTypes.DATE,
    finalizado: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    tableName: 'Processos'
  });
  
  return Processo;
};
