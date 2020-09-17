const Sequelize = require('sequelize');

const sequelize = new Sequelize('meulinkindb', 'root', '', {
    host: 'localhost', 
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