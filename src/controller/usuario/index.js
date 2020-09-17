const express = require('express');
const router = express.Router();
const validaRequisicao = require('./../../validation/ValidaRequisicao');
const validaFormCadastro = require('./../../validation/usuario/ValidaFormCadastro');

router.get('/', require('./cadastro'));

router.post('/cadastro', 
validaRequisicao(validaFormCadastro),
require('./cadastropost')
);

router.get('/perfil', 
function(req, res)
{

    return res.render('perfil/perfil');
});

module.exports = router;