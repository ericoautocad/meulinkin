const { check, body } = require('express-validator');

const validaFormLogin = [
    check('email', 'O email deve ser um endereço válido.')
        .notEmpty()
        .isEmail(),

    check('senha', 'A senha deve ter no mínimo 8 caracteres e no máximo 30.')
        .isLength({ min: 8, max: 30 })

];

module.exports = validaFormLogin;