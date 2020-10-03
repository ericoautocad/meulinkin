const express = require('express');
const validaRequisicao = require('./../../validation/ValidaRequisicao');
const validaFormCartao = require('./../../validation/pagamento/ValidaFormCartao');
const router = express.Router();

router.get('/pro', require('./pagamentoproget'));
router.post('/pro', validaRequisicao(validaFormCartao), require('./pagamentopropost'));
router.get('/alterar/cobranca', require('./alterarcobrancaget'));
router.post('/alterar/cobranca', validaRequisicao(validaFormCartao), require('./alterarcobrancapost'));

module.exports = router;