const express = require('express');
const router = express.Router();
const validaRequisicao = require('./../../validation/ValidaRequisicao');
const validaFormCadastro = require('./../../validation/usuario/ValidaFormCadastro');

// router.get('/', validaRequisicao(validaForm1), require('./home'));
router.get('/', require('./cadastro'));

// router.get('/aluno', 
// function (req, res) 
// {

//     return res.send('lorrayne');
// });

router.post('/cadastro', 
validaRequisicao(validaFormCadastro),
require('./cadastropost')
);

router.get('/perfil', 
function(req, res)
{

    return res.render('perfil/perfil');
});

// router.post('/cadastro', 

//     // funçaõ de validação de email
//     function (req, res, next) 
//     {
//         if (req.body.email !== req.body.cemail){
//             return res.send('Aqui acontece a validação. os emails não conferem');
//         }
//         return next();
//     },
//     // função de validação da senha
//     function(req, res, next)
//     {
//         if (req.body.senha !== req.body.csenha){
//             return res.send('Aqui acontece a validação. as senhas não conferem');
//         }
//         return next();
//     },
//     // função de cadastro usuario
//     function(req, res)
//     {

//         return res.send('Seu email é:' + req.body.email);
//     }
   
// );

module.exports = router;