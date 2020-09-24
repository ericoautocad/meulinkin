const express = require('express');
const router = express.Router();

const controles = () => {

    router.get('/', require('./contaget'));

    return router;

};

module.exports = controles;