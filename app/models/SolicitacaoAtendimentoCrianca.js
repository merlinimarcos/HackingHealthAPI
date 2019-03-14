'use strict';
module.exports = (sequelize, DataTypes) => {
  const SolicitacaoAtendimentoCrianca = sequelize.define('SolicitacaoAtendimentoCrianca', {
    id_pessoa: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'SolicitacaoAtendimentoCriancas'
  });
  SolicitacaoAtendimentoCrianca.associate = function(models) {
    SolicitacaoAtendimentoCrianca.belongsTo(models.Solicitacao, { foreignKey: 'id' })
    SolicitacaoAtendimentoCrianca.belongsTo(models.Pessoa, { foreignKey: 'id_pessoa' })
  };
  return SolicitacaoAtendimentoCrianca;
};