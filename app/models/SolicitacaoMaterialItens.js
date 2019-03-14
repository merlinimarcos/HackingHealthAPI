'use strict';
module.exports = (sequelize, DataTypes) => {
  const SolicitacaoMaterialItens = sequelize.define('SolicitacaoMaterialItens', {
    id_solicitacao_material: DataTypes.NUMBER,
    id_material: DataTypes.NUMBER,
    quantidade: DataTypes.NUMBER,
    entregue: DataTypes.BOOLEAN,
    valor_estimado: DataTypes.NUMBER
  }, {
    freezeTableName: true,
    tableName: 'SolicitacaoMaterialItens'
  });
  SolicitacaoMaterialItens.associate = function(models) {
    SolicitacaoMaterialItens.belongsTo(models.SolicitacaoMaterial, { foreignKey: 'id_solicitacao_material' })
    SolicitacaoMaterialItens.belongsTo(models.Material, { foreignKey: 'id_material' })
  };
  return SolicitacaoMaterialItens;
};