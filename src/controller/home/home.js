// const Usuario = require('./../../model/usuario');
const PagamentoRecorrencia = require('../../service/PagamentoRecorrencia');

module.exports = (req, res) => {
console.log(req.erros_validacao) // pegar erros de validação
    return res.render('home/home');
};