const { check } = require('express-validator');

const validaForm1 = [
    check('password', 'The password must be 5+ chars long and contain a number')
        .not().isIn(['123', 'password', 'god']).withMessage('Do not use a common word as the password')
        .isLength({ min: 5 })
        .matches(/\d/),
    check('age', 'The age a number')
        .isInt()
];

module.exports = validaForm1;