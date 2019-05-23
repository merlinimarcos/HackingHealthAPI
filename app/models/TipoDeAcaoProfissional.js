'use strict';
module.exports = (sequelize, DataTypes) => {
  const TipoDeAcaoProfissional = sequelize.define('TipoDeAcaoProfissional', {
    descricao_tipo_acao: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'TiposDeAcaoProfissional'
  });
  TipoDeAcaoProfissional.associate = function(models) {
    TipoDeAcaoProfissional.belongsToMany(models.SolicitacaoProfissional, { through: models.SolicitacaoProfissionalAcoes, foreignKey: 'id_acao'});
  };
  return TipoDeAcaoProfissional;
};