const express = require('express');
const router = express.Router();
const validaRequisicao = require('./../../validation/ValidaRequisicao');
const validaFormCadastro = require('./../../validation/usuario/ValidaFormCadastro');
const validaFormLogin = require('./../../validation/usuario/ValidaFormLogin');



const controles = (passport) => {
    
    router.get('/usuario/cadastro', require('./cadastro'));

    router.post(
        '/usuario/cadastro', 
        validaRequisicao(validaFormCadastro),
        require('./cadastropost'),
        passport.authenticate('sessao-cadastro'),
        function(req, res) {
            if (req.user) {

                return res.redirect('/perfil');
          
            } else {

                return res.redirect('/login'); 

            }
          
        }
    );
    
    router.post(
        '/usuario/login', 
        validaRequisicao(validaFormLogin),
        require('./loginpost'),
        passport.authenticate('sessao-autenticacao', {
            successRedirect: '/perfil',
            faliureRedirect: '/login'
        }),
        // function(req, res) {
        //     console.log('info usuario', req.user)
        //     if (req.user) {

        //         return res.redirect('/perfil');
          
        //     } else {

        //         return res.redirect('/login'); 

        //     }
          
        // }
    );

    

    return router;

}

module.exports = controles;