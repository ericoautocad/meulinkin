const express = require('express');
const router = express.Router();

// router.get('/', validaRequisicao(validaForm1), require('./home'));
router.get('/', require('./cadastro'));

module.exports = router;