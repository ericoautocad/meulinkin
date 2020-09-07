const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

const model = sequelize.define('plano', {
    nome: DataTypes.STRING(150),
    valor: DataTypes.DECIMAL(10, 2),
    vantagens: DataTypes.TEXT,
    periodicidade: DataTypes.INTEGER,
    status: { 
        type: DataTypes.INTEGER(1),
        allowNull : false, 
        defaultValue : '1'

     }
    }, {
        timestamps: false,
        freezeTableName : true
    });

module.exports = model;