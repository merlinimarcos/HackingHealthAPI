'use strict';
module.exports = (sequelize, DataTypes) => {
  const GruposMateriais = sequelize.define('GruposMateriais', {
    descricao_grupo: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'GruposMateriais'
  });
  GruposMateriais.associate = function(models) {
    // associations can be defined here
  };
  return GruposMateriais;
};