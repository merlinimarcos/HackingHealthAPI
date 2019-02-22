'use strict';
module.exports = (sequelize, DataTypes) => {
  const Perfil = sequelize.define('Perfil', {
    descricao: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'Perfis'
});
  Perfil.associate = function(models) {
    Perfil.belongsToMany(models.Usuario, { through: models.UsuarioPerfil, foreignKey: 'id_perfil'});
  };
  return Perfil;
};
