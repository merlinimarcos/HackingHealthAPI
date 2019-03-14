'use strict';
module.exports = (sequelize, DataTypes) => {
  const SolicitacaoProfissional = sequelize.define('SolicitacaoProfissional', {
    id_tipo_acao: DataTypes.NUMBER,
    id_especialidade: DataTypes.NUMBER,
    outra_especialidade: DataTypes.STRING,
    outra_acao: DataTypes.STRING,
    dt_necessidade: DataTypes.DATE,
    custo_estimado: DataTypes.NUMBER
  }, {
    freezeTableName: true,
    tableName: 'SolicitacaoProfissional'
  });
  SolicitacaoProfissional.associate = function(models) {
    SolicitacaoProfissional.belongsTo(models.Solicitacao, { foreignKey: 'id' })
    SolicitacaoProfissional.belongsTo(models.TipoDeAcaoProfissional, { foreignKey: 'id_tipo_acao' })
    SolicitacaoProfissional.belongsTo(models.EspecialidadeProfissional, { foreignKey: 'id_especialidade' })
  };
  return SolicitacaoProfissional;
};