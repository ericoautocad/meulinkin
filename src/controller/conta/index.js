const express = require('express');
const validaRequisicao = require('./../../validation/ValidaRequisicao');
const validaFormPessoal = require('./../../validation/usuario/ValidaFormPessoal');
const router = express.Router();

router.get('/pessoal', require('./pessoalget'));
router.post('/pessoal', validaRequisicao(validaFormPessoal), require('./pessoalpost'));

module.exports = router;
