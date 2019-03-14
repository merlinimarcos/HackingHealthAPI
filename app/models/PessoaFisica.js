'use strict';
module.exports = (sequelize, DataTypes) => {
  const PessoaFisica = sequelize.define('PessoaFisica', {
    dt_nasc: DataTypes.DATE,
    sexo: DataTypes.STRING,
    estado_civil: DataTypes.STRING,
    interprete: DataTypes.STRING,
    idioma: DataTypes.STRING,
    responsavel: DataTypes.INTEGER,
    reside_com: DataTypes.INTEGER,
    renda_familiar: DataTypes.DECIMAL(10, 2),
    tipo_parto: DataTypes.STRING,
    ano_mes_cadastro: DataTypes.INTEGER,
    sequencia_ano_cadastro: DataTypes.INTEGER,
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