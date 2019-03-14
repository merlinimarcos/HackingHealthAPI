'use strict';
module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define('Material', {
    id_grupo: DataTypes.NUMBER,
    id_unidade: DataTypes.NUMBER,
    descricao_material: DataTypes.STRING,
    valor: DataTypes.NUMBER
  }, {
    freezeTableName: true,
    tableName: 'Materiais'
  });
  Material.associate = function(models) {
    Material.belongsTo(models.GruposMateriais, { foreignKey: 'id_grupo' })
    Material.belongsTo(models.UnidadeMaterial, { foreignKey: 'id_unidade' })
  };
  return Material;
};