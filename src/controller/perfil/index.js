const express = require('express');
const router = express.Router();

const controles = () => {

    router.get('/perfil/conta', require('./contaget'));

    return router;

};

module.exports = controles;