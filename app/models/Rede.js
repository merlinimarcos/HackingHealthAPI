'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rede = sequelize.define('Rede', {
    descricao: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Redes'
  });
  Rede.associate = function(models) {
    // associations can be defined here
  };
  return Rede;
};