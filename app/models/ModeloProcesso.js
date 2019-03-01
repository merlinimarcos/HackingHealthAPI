'use strict';
module.exports = (sequelize, DataTypes) => {
  const ModeloProcesso = sequelize.define('ModeloProcesso', {
    descricao: DataTypes.STRING,
    xml_camunda: DataTypes.TEXT,
    data_criacao: DataTypes.DATE,
    data_validade: DataTypes.DATE,
    habilitado: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    tableName: 'ModeloProcessos'
  });
  ModeloProcesso.associate = function(models) {
    ModeloProcesso.hasMany(models.Processo, {targetKey: 'id_modeloprocesso'});
  };
  return ModeloProcesso;
};
