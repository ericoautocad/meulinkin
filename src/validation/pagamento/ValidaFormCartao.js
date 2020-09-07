const { check } = require('express-validator');

const validaFormCartao = [
    check('card_number', 'O número do cartão ser somente numeros e possuir 16 caracteres.')
        .isLength({ min: 16, max: 16 })
        .isInt(),
    check('card_holder_name', 'O nome no cartão deve ser informado.')
        .notEmpty(),
    check('card_expiration_date', 'A data de expiração deve ser apenas numeros e deve está no formato: MMAA.')
        .isLength({ min: 4, max: 4 })
        .isInt(),
    check('card_cvv', 'O código de verificação do cartão deve ser apenas numeros e ser composto por 3 digitos.')
        .isLength({ min: 3, max: 3 })
        .isInt()
];

module.exports = validaFormCartao;
