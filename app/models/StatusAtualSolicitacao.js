'use strict';
module.exports = (sequelize, DataTypes) => {
  const StatusAtualSolicitacao = sequelize.define('StatusAtualSolicitacao', {
    id_solicitacao: DataTypes.INTEGER,
    id_status: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER,
    feedback: DataTypes.STRING,
    data_status: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'StatusAtualSolicitacao'
  });
  StatusAtualSolicitacao.associate = function(models) {
    StatusAtualSolicitacao.belongsTo(models.Solicitacao, { foreignKey: 'id_solicitacao' })
    StatusAtualSolicitacao.belongsTo(models.StatusSolicitacao, { foreignKey: 'id_status' })
    StatusAtualSolicitacao.belongsTo(models.Usuario, { foreignKey: 'id_usuario' })
  };
  return StatusAtualSolicitacao;
};