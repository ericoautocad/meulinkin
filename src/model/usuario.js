const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

const model = sequelize.define('usuario', {
    email: DataTypes.STRING(100),
    senha: DataTypes.STRING(255),
    grupo: DataTypes.STRING(50),
    telefone: DataTypes.STRING(80),
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