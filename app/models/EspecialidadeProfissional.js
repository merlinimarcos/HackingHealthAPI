'use strict';
module.exports = (sequelize, DataTypes) => {
  const EspecialidadeProfissional = sequelize.define('EspecialidadeProfissional', {
    descricao: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'EspecialidadesProfissional'
  });
  EspecialidadeProfissional.associate = function(models) {
    EspecialidadeProfissional.belongsToMany(models.SolicitacaoProfissional, { through: models.SolicitacaoProfissionalEspecialidades, foreignKey: 'id_especialidade'});
  };
  return EspecialidadeProfissional;
};