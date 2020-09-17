const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const helmet = require('helmet');
const nunjucks = require('nunjucks');
const passport = require('passport');
const expressSession = require('express-session');
const app = express();
const port = 8080;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(helmet());

require('./src/model/database');

app.set('view engine', 'html');

const engineTemplate = nunjucks.configure('src/view', { 
    autoescape: true,
    express: app
});

engineTemplate.addGlobal('urlSite', 'http://localhost:8080');

// Configuring Passport
// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'chaveSecretaPassaporte'}));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('./src/service/usuario/ConfiguracaoPassport');
initPassport(passport);

require('./src/rotas')(app, passport);

app.use(express.static('public'));

app.listen(port, () =>{
    console.log('Express has been starte on port: ' + port);
});