'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    login: DataTypes.STRING,
    senha: DataTypes.STRING,
    data_ult_acesso: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'Usuarios'
  });
  Usuario.associate = function(models) {
    Usuario.belongsTo(models.Pessoa, { foreignKey: 'id' })
    Usuario.belongsToMany(models.Perfil, { through: models.UsuarioPerfil, foreignKey: 'id_usuario'});
  };
  return Usuario;
};
