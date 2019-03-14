'use strict';
module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define('Material', {
    id_grupo: DataTypes.INTEGER,
    id_unidade: DataTypes.INTEGER,
    descricao_material: DataTypes.STRING,
    valor: DataTypes.DECIMAL(10, 2)
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