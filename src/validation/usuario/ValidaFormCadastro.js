const { check, body } = require('express-validator');
const usuarioModel = require('./../../model/usuario');

const validaFormCadastro = [
    check('email', 'O email deve ser um endereço válido.')
        .notEmpty()
        .isEmail(),

    check('senha', 'A senha deve ter no mínimo 8 caracteres e no máximo 30.')
        .isLength({ min: 8, max: 30 }),
    body('cemail').custom((value, { req }) => {
            if (value !== req.body.email) {
              throw new Error('O campo email e confimação de email não conferem.');
            }
            
            return true; 
    }),

    body('csenha').custom((value, { req }) => {
        if (value !== req.body.senha) {
          throw new Error('O campo senha e confimação de senha não conferem.');
        }
        
        return true; 
    }),

    body('email').custom( async value => {
        const usuario = await usuarioModel.findOne({ where: {email: value}} );
        if (usuario) {
           throw new Error('E-mail indisponível.');
        }

    })

];

module.exports = validaFormCadastro;