'use strict';
module.exports = (sequelize, DataTypes) => {
  const Solicitacao = sequelize.define('Solicitacao', {
    id_usuario: DataTypes.INTEGER,
    tipo_solicitacao: DataTypes.INTEGER,
    descricao: DataTypes.STRING,
    dt_solicitacao: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'Solicitacoes'
  });
  Solicitacao.associate = function(models) {
    Solicitacao.belongsTo(models.Usuario, { foreignKey: 'id_usuario' })
    Solicitacao.belongsTo(models.TipoSolicitacao, { foreignKey: 'tipo_solicitacao' })
  };
  return Solicitacao;
};