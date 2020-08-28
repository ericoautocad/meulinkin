const express = require('express');
const router = express.Router();
const validaRequisicao = require('./../../validation/ValidaRequisicao');
const validaForm1 = require('./../../validation/home/ValidaForm1');
const validaForm2 = require('./../../validation/home/ValidaForm2');

// router.get('/', validaRequisicao(validaForm1), require('./home'));
router.get('/', require('./home'));

module.exports = router;
