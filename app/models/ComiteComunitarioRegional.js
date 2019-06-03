'use strict';
module.exports = (sequelize, DataTypes) => {
  const ComiteComunitarioRegional = sequelize.define('ComiteComunitarioRegional', {
    descricao: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'ComiteComunitarioRegional'
  });
  ComiteComunitarioRegional.associate = function(models) {
    // associations can be defined here
  };
  return ComiteComunitarioRegional;
};