'use strict';
module.exports = (sequelize, DataTypes) => {
  const EspecialidadeProfissional = sequelize.define('EspecialidadeProfissional', {
    descricao: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'EspecialidadesProfissional'
  });
  EspecialidadeProfissional.associate = function(models) {
    // associations can be defined here
  };
  return EspecialidadeProfissional;
};