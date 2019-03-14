'use strict';
module.exports = (sequelize, DataTypes) => {
  const SolicitacaoMaterial = sequelize.define('SolicitacaoMaterial', {
    prestacao_de_contas: DataTypes.STRING,
    dt_prestacao_contas: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'SolicitacaoMateriais'
  });
  SolicitacaoMaterial.associate = function(models) {
    SolicitacaoMaterial.belongsTo(models.Solicitacao, { foreignKey: 'id' })
  };
  return SolicitacaoMaterial;
};