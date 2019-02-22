'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsuarioPerfil = sequelize.define('UsuarioPerfil', {
    id_usuario: DataTypes.INTEGER,
    id_perfil: DataTypes.INTEGER,
  }, {
    freezeTableName: true,
    tableName: 'UsuariosPerfis'
  });
  UsuarioPerfil.associate = function(models) {

  };
  return UsuarioPerfil;
};
