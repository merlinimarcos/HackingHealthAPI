'use strict';
module.exports = (sequelize, DataTypes) => {
  const SolicitacaoProfissionalAcoes = sequelize.define('SolicitacaoProfissionalAcoes', {
    id_solicitacao: DataTypes.INTEGER,
    id_acao: DataTypes.INTEGER
  }, {});
  SolicitacaoProfissionalAcoes.associate = function(models) {
    // associations can be defined here
  };
  return SolicitacaoProfissionalAcoes;
};