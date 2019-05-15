'use strict';
module.exports = (sequelize, DataTypes) => {
  const StatusSolicitacao = sequelize.define('StatusSolicitacao', {
    descricao: DataTypes.STRING,
    id_perfil: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'StatusSolicitacao'
  });
  StatusSolicitacao.associate = function(models) {
    // associations can be defined here
  };
  return StatusSolicitacao;
};