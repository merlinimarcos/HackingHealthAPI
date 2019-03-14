'use strict';
module.exports = (sequelize, DataTypes) => {
  const PessoaLocomocao = sequelize.define('PessoaLocomocao', {
    id_pessoa: DataTypes.NUMBER,
    tipo: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'PessoaLocomocoes'
  });
  PessoaLocomocao.associate = function(models) {
    PessoaLocomocao.belongsTo(models.Pessoa, { foreignKey: 'id_pessoa' })
  };
  return PessoaLocomocao;
};