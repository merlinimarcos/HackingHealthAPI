'use strict';
module.exports = (sequelize, DataTypes) => {
  const SolicitacaoMaterialItens = sequelize.define('SolicitacaoMaterialItens', {
    id_solicitacao_material: DataTypes.INTEGER,
    id_material: DataTypes.INTEGER,
    quantidade: DataTypes.INTEGER,
    entregue: DataTypes.BOOLEAN,
    valor_estimado: DataTypes.DECIMAL(10, 2)
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