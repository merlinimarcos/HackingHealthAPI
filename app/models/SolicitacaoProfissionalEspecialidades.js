'use strict';
module.exports = (sequelize, DataTypes) => {
  const SolicitacaoProfissionalEspecialidades = sequelize.define('SolicitacaoProfissionalEspecialidades', {
    id_solicitacao: DataTypes.INTEGER,
    id_especialidade: DataTypes.INTEGER
  }, {});
  SolicitacaoProfissionalEspecialidades.associate = function(models) {
    // associations can be defined here
  };
  return SolicitacaoProfissionalEspecialidades;
};