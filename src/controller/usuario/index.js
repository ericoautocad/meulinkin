const express = require('express');
const router = express.Router();
const validaRequisicao = require('./../../validation/ValidaRequisicao');
const validaFormCadastro = require('./../../validation/usuario/ValidaFormCadastro');
// const passport = require('passport');



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
    
    // router.get('/perfil', 
    // function(req, res)
    // {
    
    //     return res.render('perfil/perfil');
    // });

    

    return router;

}

module.exports = controles;