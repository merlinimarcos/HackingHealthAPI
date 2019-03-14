'use strict';
module.exports = (sequelize, DataTypes) => {
  const TipoSolicitacao = sequelize.define('TipoSolicitacao', {
    descricao_tipo: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'TiposSolicitacoes'
  });
  TipoSolicitacao.associate = function(models) {
    // associations can be defined here
  };
  return TipoSolicitacao;
};