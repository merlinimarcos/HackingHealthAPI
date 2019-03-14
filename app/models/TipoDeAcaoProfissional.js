'use strict';
module.exports = (sequelize, DataTypes) => {
  const TipoDeAcaoProfissional = sequelize.define('TipoDeAcaoProfissional', {
    descricao_tipo_acao: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'TiposDeAcaoProfissional'
  });
  TipoDeAcaoProfissional.associate = function(models) {
    // associations can be defined here
  };
  return TipoDeAcaoProfissional;
};