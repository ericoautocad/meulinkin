const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const helmet = require('helmet');
const Sequelize = require('sequelize');
const app = express();
const port = process.env.PORT | 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(helmet());

const sequelize = new Sequelize('dbname', 'user', 'password', {
    host: 'localhost', 
    port: 3306, 
    dialect: 'mysql', 
    operatorsAliasses: Sequelize.Op
});
sequelize
    .authenticate()
    .then(() => console.log('OK'))
    .catch(() => console.log('ERROR'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/view'));

require('./src/index')(app);

app.listen(port, () =>{
    console.log('Express has been starte on port: ' + port);
});