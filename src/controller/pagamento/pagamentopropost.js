const Usuario = require('./../../model/usuario');
const Plano = require('./../../model/plano');
const Assinatura = require('./../../model/assinatura');
const PagamentoRecorrencia = require('../../service/PagamentoRecorrencia');

module.exports = (req, res) => {
    const pagamento = new PagamentoRecorrencia();
    

    return res.render('home/home');
};