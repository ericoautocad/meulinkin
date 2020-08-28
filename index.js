const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const helmet = require('helmet');
const nunjucks = require('nunjucks');
const app = express();
const port = 8080;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(helmet());

require('./src/model/database');

app.set('view engine', 'html');

nunjucks.configure('src/view', { 
    autoescape: true,
    express: app
});

require('./src/index')(app);

app.listen(port, () =>{
    console.log('Express has been starte on port: ' + port);
});