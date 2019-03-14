'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    login: DataTypes.STRING,
    senha: DataTypes.STRING,
    id_rede: DataTypes.NUMBER,
    instituicao: DataTypes.NUMBER,
    data_ult_acesso: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'Usuarios'
  });
  Usuario.associate = function(models) {
    Usuario.belongsTo(models.Pessoa, { foreignKey: 'id' })
    Usuario.belongsTo(models.Rede, { foreignKey: 'id_rede' })
    Usuario.belongsTo(models.PessoaJuridica, { foreignKey: 'instituicao' })
    Usuario.belongsToMany(models.Perfil, { through: models.UsuarioPerfil, foreignKey: 'id_usuario'});
  };
  return Usuario;
};
