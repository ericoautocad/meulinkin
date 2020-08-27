const { check } = require('express-validator');

const validaForm2 = [
    check('site', 'The site must be a valid URL.')
        .isURL(),
    check('name', 'The name is required.')
        .not()
        .isEmpty()
];

module.exports = validaForm2;