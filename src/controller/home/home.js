// const path = require('path');
// const Usuario = require('./../../model/usuario');
// const nunjucks = require('nunjucks');
// const PagamentoRecorrencia = require('../../service/PagamentoRecorrencia');

module.exports = (req, res) => {
    console.log(req.erros_validacao)
    return res.render('home');
};