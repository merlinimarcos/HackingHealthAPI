'use strict';
module.exports = (sequelize, DataTypes) => {
  const PessoaTelefone = sequelize.define('PessoaTelefone', {
    id_pessoa: DataTypes.NUMBER,
    tipo: DataTypes.STRING,
    numero: DataTypes.STRING,
    ddd: DataTypes.STRING,
    proprietario: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'PessoaTelefones'
  });
  PessoaTelefone.associate = function(models) {
    PessoaTelefone.belongsTo(models.Pessoa, { foreignKey: 'id_pessoa' })
  };
  return PessoaTelefone;
};