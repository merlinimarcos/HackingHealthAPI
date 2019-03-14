'use strict';
module.exports = (sequelize, DataTypes) => {
  const PessoaSitClinica = sequelize.define('PessoaSitClinica', {
    id_pessoa: DataTypes.INTEGER,
    tipo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    dt_inicio: DataTypes.DATE,
    desc_inicio: DataTypes.STRING,
    desc_tratamentos_anteriores: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'PessoaSitClinica'
  });
  PessoaSitClinica.associate = function(models) {
    PessoaSitClinica.belongsTo(models.Pessoa, { foreignKey: 'id_pessoa' })
  };
  return PessoaSitClinica;
};