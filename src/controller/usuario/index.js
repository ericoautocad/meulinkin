const express = require('express');
const router = express.Router();
const validaRequisicao = require('./../../validation/ValidaRequisicao');
const validaFormCadastro = require('./../../validation/usuario/ValidaFormCadastro');
const validaFormLogin = require('./../../validation/usuario/ValidaFormLogin');

const controles = (passport) => {
    
    router.get('/cadastro', require('./cadastro'));

    router.post(
        '/cadastro', 
        validaRequisicao(validaFormCadastro),
        require('./cadastropost'),
        passport.authenticate('sessao-autenticacao'),
        function(req, res) {
            if (req.user) {

                return res.redirect('/perfil');
          
            } else {

                return res.redirect('/login'); 

            }
          
        }
    );

    router.get('/login', require('./loginget'));

    router.post(
        '/login', 
        validaRequisicao(validaFormLogin),
        require('./loginpost'),
        passport.authenticate('sessao-autenticacao'),
        function(req, res) {
            if (req.user) {

                return res.redirect('/perfil');
          
            } else {

                return res.redirect('/login'); 

            }
          
        }
    );

    

    return router;

}

module.exports = controles;