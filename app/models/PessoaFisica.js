'use strict';
module.exports = (sequelize, DataTypes) => {
  const PessoaFisica = sequelize.define('PessoaFisica', {
    dt_nasc: DataTypes.DATE,
    sexo: DataTypes.STRING,
    estado_civil: DataTypes.STRING,
    interprete: DataTypes.STRING,
    idioma: DataTypes.STRING,
    responsavel: DataTypes.NUMBER,
    reside_com: DataTypes.NUMBER,
    renda_familiar: DataTypes.NUMBER,
    tipo_parto: DataTypes.STRING,
    ano_mes_cadastro: DataTypes.NUMBER,
    sequencia_ano_cadastro: DataTypes.NUMBER,
    senha_consulta_solicitacao: DataTypes.STRING,
    dt_ultima_consulta: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'PessoasFisicas'
  });
  PessoaFisica.associate = function(models) {
    PessoaFisica.belongsTo(models.Pessoa, { foreignKey: 'id' })
    PessoaFisica.belongsTo(models.Pessoa, { foreignKey: 'responsavel' })
    PessoaFisica.belongsTo(models.Pessoa, { foreignKey: 'reside_com' })
  };
  return PessoaFisica;
};