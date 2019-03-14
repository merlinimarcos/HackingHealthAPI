'use strict';
module.exports = (sequelize, DataTypes) => {
  const PessoaJuridica = sequelize.define('PessoaJuridica', {
    cnpj: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'PessoasJuridicas'
  });
  PessoaJuridica.associate = function(models) {
    PessoaJuridica.belongsTo(models.Pessoa, { foreignKey: 'id' })
  };
  return PessoaJuridica;
};