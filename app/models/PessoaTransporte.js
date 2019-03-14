'use strict';
module.exports = (sequelize, DataTypes) => {
  const PessoaTransporte = sequelize.define('PessoaTransporte', {
    id_pessoa: DataTypes.INTEGER,
    tipo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    responsavel: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'PessoaTransportes'
  });
  PessoaTransporte.associate = function(models) {
    PessoaTransporte.belongsTo(models.Pessoa, { foreignKey: 'id_pessoa' })
  };
  return PessoaTransporte;
};