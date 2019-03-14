'use strict';
module.exports = (sequelize, DataTypes) => {
  const UnidadeMaterial = sequelize.define('UnidadeMaterial', {
    descricao_unidade: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'UnidadeMateriais'
  });
  UnidadeMaterial.associate = function(models) {
    // associations can be defined here
  };
  return UnidadeMaterial;
};