'use strict';
module.exports = (sequelize, DataTypes) => {
  const SolicitacaoProfissional = sequelize.define('SolicitacaoProfissional', {    
    outra_especialidade: DataTypes.STRING,
    outra_acao: DataTypes.STRING,
    justificativa_valor: DataTypes.STRING,
    data_inicial_periodo_necessidade: DataTypes.DATE,
    data_final_periodo_necessidade: DataTypes.DATE,
    custo_estimado: DataTypes.DECIMAL(10, 2)
  }, {
    freezeTableName: true,
    tableName: 'SolicitacaoProfissional'
  });
  SolicitacaoProfissional.associate = function(models) {
    SolicitacaoProfissional.belongsTo(models.Solicitacao, { foreignKey: 'id' })
    SolicitacaoProfissional.belongsToMany(models.TipoDeAcaoProfissional, { through: models.SolicitacaoProfissionalAcoes, foreignKey: 'id_solicitacao'});
    SolicitacaoProfissional.belongsToMany(models.EspecialidadeProfissional, { through: models.SolicitacaoProfissionalEspecialidades, foreignKey: 'id_solicitacao'});    
  };
  return SolicitacaoProfissional;
};