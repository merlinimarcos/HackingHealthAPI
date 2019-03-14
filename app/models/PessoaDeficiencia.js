'use strict';
module.exports = (sequelize, DataTypes) => {
  const PessoaDeficiencia = sequelize.define('PessoaDeficiencia', {
    id_pessoa: DataTypes.INTEGER,
    tipo: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'PessoasDeficiencia'
  });
  PessoaDeficiencia.associate = function(models) {
    PessoaDeficiencia.belongsTo(models.Pessoa, { foreignKey: 'id_pessoa' })
  };
  return PessoaDeficiencia;
};