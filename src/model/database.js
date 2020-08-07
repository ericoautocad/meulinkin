const Sequelize = require('sequelize');

const sequelize = new Sequelize('meulinkindb', 'root', 'meulinkindb2020!', {
    host: 'banco', 
    port: 3306, 
    dialect: 'mysql', 
    operatorsAliasses: Sequelize.Op
});

sequelize
    .authenticate()
    .then(() => console.log('OK'))
    .catch(() => console.log('ERROR'));

sequelize.sync();

module.exports = sequelize;