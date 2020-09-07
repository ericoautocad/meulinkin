const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./database');
const modelPlano = require('./plano');
const modelUsuario = require('./usuario');

const model = sequelize.define('assinatura', {
    data_inicio: {
        type: DataTypes.DATE,
        allowNull : false
    },
    data_fim: {
        type: DataTypes.DATE,
        allowNull : true
    },
    tipo: DataTypes.STRING(255),
    assinatura_pagamento_id: {
        type: DataTypes.INTEGER,
        allowNull : true
    },
    status: { 
        type: DataTypes.STRING(50),
        allowNull : false, 
        defaultValue : 'ativo'

     }
    }, {
        underscore: true,
        timestamps: false,
        freezeTableName : true
    });

model.belongsTo(modelUsuario, {foreignKey: 'usuario_id'});
model.belongsTo(modelPlano, {foreignKey: 'plano_id'});

module.exports = model;