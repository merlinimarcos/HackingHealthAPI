'use strict';
module.exports = (sequelize, DataTypes) => {
  const StatusAtualSolicitacao = sequelize.define('StatusAtualSolicitacao', {
    id_solicitacao: DataTypes.INTEGER,
    id_status: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER,
    feedback: DataTypes.TEXT,
    data_status: DataTypes.DATE,
    concluido: DataTypes.INTEGER,
    email_shriner_aprovador_regional: DataTypes.STRING,
    id_usuario_reivindicacao: DataTypes.INTEGER,
    id_comite_comunitario_regional: DataTypes.INTEGER,
    aprovar_requisicao: DataTypes.INTEGER,
    requisicao_atendida_localmente: DataTypes.INTEGER,
    existe_estimativa_de_valor: DataTypes.STRING,
    encaminhar_clube: DataTypes.INTEGER,
    encaminhar_templo: DataTypes.INTEGER,
    requisicao_atendida_clube: DataTypes.INTEGER,
    caso_envio_eua: DataTypes.INTEGER,          
    encaminhar_eua: DataTypes.INTEGER          
  }, {
    freezeTableName: true,
    tableName: 'StatusAtualSolicitacao'
  });
  StatusAtualSolicitacao.associate = function(models) {
    StatusAtualSolicitacao.belongsTo(models.Solicitacao, { foreignKey: 'id_solicitacao' })
    StatusAtualSolicitacao.belongsTo(models.StatusSolicitacao, { foreignKey: 'id_status' })
    StatusAtualSolicitacao.belongsTo(models.Usuario, { foreignKey: 'id_usuario' })
    StatusAtualSolicitacao.belongsTo(models.ComiteComunitarioRegional, { foreignKey: 'id_comite_comunitario_regional' })

  };
  return StatusAtualSolicitacao;
};