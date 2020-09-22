const express = require('express');
const validaRequisicao = require('./../../validation/ValidaRequisicao');
const validaFormCartao = require('./../../validation/pagamento/ValidaFormCartao');
const router = express.Router();

const controles = () => {

    router.get('/pro', require('./pagamentoproget'));
    router.post('/pro', validaRequisicao(validaFormCartao), require('./pagamentopropost'));

    return router;

};

module.exports = controles;